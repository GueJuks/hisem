from flask import Flask, request, jsonify, send_from_directory
import joblib
import os

app = Flask(__name__)

# === Load Model ===
try:
    model = joblib.load("model_smote_40.pkl")
except Exception as e:
    print("⚠️ Gagal memuat model:", e)
    model = None


@app.route("/")
def home():
    # langsung kirim index.html tanpa folder templates
    return send_from_directory(os.getcwd(), "index.html")


@app.route("/<path:filename>")
def serve_static(filename):
    # agar style.css, script.js, dan gambar tetap bisa diakses
    return send_from_directory(os.getcwd(), filename)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text_input = data.get("text_input", "")

        if not text_input.strip():
            return jsonify({"error": "Teks tidak boleh kosong."})

        if model is None:
            return jsonify({"error": "Model belum dimuat."})

        prediction = model.predict([text_input])[0]
        return jsonify({"prediction": str(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
