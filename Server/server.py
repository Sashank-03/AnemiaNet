import joblib
import cv2
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import load_img,img_to_array
import base64
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from gevent.pywsgi import WSGIServer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def process_rf_image(image):
    img = cv2.imread(image)
    img=cv2.resize(img,(224,224))
    lab_image = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

    l_hist = cv2.calcHist([lab_image], [0], None, [256], [0, 256]).flatten()
    a_hist = cv2.calcHist([lab_image], [1], None, [256], [0, 256]).flatten()
    b_hist = cv2.calcHist([lab_image], [2], None, [256], [0, 256]).flatten()


    hsv_image = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h_hist = cv2.calcHist([hsv_image], [0], None, [256], [0, 256]).flatten()
    s_hist = cv2.calcHist([hsv_image], [1], None, [256], [0, 256]).flatten()
    v_hist = cv2.calcHist([hsv_image], [2], None, [256], [0, 256]).flatten()

    ft=np.array([np.concatenate([l_hist, a_hist, b_hist,h_hist,s_hist,v_hist])])
    ft=ft.reshape(ft.shape[0], -1)
    return ft

def process_knn_image(image):
    img = cv2.imread(image)
    img=cv2.resize(img,(224,224))
    lab_image = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

    l_hist = cv2.calcHist([lab_image], [0], None, [256], [0, 256]).flatten()
    a_hist = cv2.calcHist([lab_image], [1], None, [256], [0, 256]).flatten()
    b_hist = cv2.calcHist([lab_image], [2], None, [256], [0, 256]).flatten()

    ft=np.array([np.concatenate([l_hist, a_hist, b_hist])])
    ft=ft.reshape(ft.shape[0], -1)
    return ft

def process_cnn_image(img):
    img = load_img(img, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.  # Normalize pixel values
    return img_array

print("Loading Models")

conjunctiva_cnn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/conj_model_98.h5'
conjunctiva_knn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/knn_conj_99.joblib'
conjunctiva_rf_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/RF_CJ_99.joblib'

palm_cnn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/palm_model_98f.h5'
palm_knn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/knn_palm_98.joblib'
palm_rf_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/RF_PM_97.joblib'

finger_nails_cnn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/fing_model_95.h5'
finger_nails_knn_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/knn_fn_98.joblib'
finger_nails_rf_model_path = 'D:/VS - Code/PS-Anemia_Detection/Server/Models/RF_FN_97.joblib'

final_model_path='D:/VS - Code/PS-Anemia_Detection/Server/Models/svm_model_100.joblib'

conjunctiva_cnn_model = load_model(conjunctiva_cnn_model_path,compile=False)
conjunctiva_knn_model = joblib.load(conjunctiva_knn_model_path)
conjunctiva_rf_model = joblib.load(conjunctiva_rf_model_path)

finger_nails_cnn_model = load_model(finger_nails_cnn_model_path,compile=False)
finger_nails_knn_model = joblib.load(finger_nails_knn_model_path)
finger_nails_rf_model = joblib.load(finger_nails_rf_model_path)

palm_cnn_model = load_model(palm_cnn_model_path,compile=False)
palm_knn_model = joblib.load(palm_knn_model_path)
palm_rf_model = joblib.load(palm_rf_model_path)

final_model=joblib.load(final_model_path)

print('All models loaded')

predictions= [0] * 9

# /conjuctiva route
@app.route('/conjunctiva', methods=['POST'])
def predict_conjuctiva():
    data = request.json
    image_data = data['image_data']
    image_bytes = base64.b64decode(image_data.split(',')[1])
    image_path = 'conjunctiva.png'
    with open(image_path, 'wb') as f:
        f.write(image_bytes)
    
    # Call the predict function
    prediction_cnn = conjunctiva_cnn_model.predict(process_cnn_image(image_path))
    prediction_knn = conjunctiva_knn_model.predict(process_knn_image(image_path))
    prediction_rf = conjunctiva_rf_model.predict(process_rf_image(image_path))

    predictions[0]="{:.5f}".format(prediction_cnn[0][0])
    predictions[3]=prediction_knn[0]
    predictions[6]=prediction_rf[0]
    
    # Delete the image file after prediction
    # print(predictions)
    os.remove(image_path)
    return jsonify({'cnn':str(predictions[0]),'knn':str(predictions[3]),'rf':str(predictions[6]) })

# /finger_nail route
@app.route('/finger_nail', methods=['POST'])
def predict_finger_nails():
    data = request.json
    image_data = data['image_data']
    image_bytes = base64.b64decode(image_data.split(',')[1])
    image_path = 'finger_nail.png'
    with open(image_path, 'wb') as f:
        f.write(image_bytes)
    
    # Call the predict function
    prediction_cnn = finger_nails_cnn_model.predict(process_cnn_image(image_path))
    prediction_knn = finger_nails_knn_model.predict(process_knn_image(image_path))
    prediction_rf = finger_nails_rf_model.predict(process_rf_image(image_path))

    predictions[1]="{:.5f}".format(prediction_cnn[0][0])
    predictions[4]=prediction_knn[0]
    predictions[7]=prediction_rf[0]
    
    # Delete the image file after prediction
    os.remove(image_path)
    return jsonify({'cnn':str(predictions[1]),'knn':str(predictions[4]),'rf':str(predictions[7]) })

# /palm route
@app.route('/palm', methods=['POST'])
def predict_palm():
    data = request.json
    image_data = data['image_data']
    image_bytes = base64.b64decode(image_data.split(',')[1])
    image_path = 'palm.png'
    with open(image_path, 'wb') as f:
        f.write(image_bytes)
    
    # Call the predict function
    prediction_cnn = palm_cnn_model.predict(process_cnn_image(image_path))
    prediction_knn = palm_knn_model.predict(process_knn_image(image_path))
    prediction_rf = palm_rf_model.predict(process_rf_image(image_path))

    predictions[2]="{:.5f}".format(prediction_cnn[0][0])
    predictions[5]=prediction_knn[0]
    predictions[8]=prediction_rf[0]
    
    # Delete the image file after prediction
    os.remove(image_path)
    return jsonify({'cnn':str(predictions[2]),'knn':str(predictions[5]),'rf':str(predictions[8]) })

# /final route
@app.route('/final', methods=['POST'])
def predict_final():
    pred=final_model.predict_proba([predictions])
    no="{:.2f}".format(pred[0][0]*100)
    yes="{:.2f}".format(pred[0][1]*100)
    return jsonify({'no':str(no), 'yes':str(yes)})

if __name__ == '__main__':
    try:
        http_server = WSGIServer(("127.0.0.1", 5000), app)
        print("Serving on port 5000...")
        http_server.serve_forever()
    except KeyboardInterrupt:
        print("Terminating server...")
        os.kill(os.getpid(), 9)