from flask import Flask, request, jsonify
from google.cloud import recaptchaenterprise_v1
from google.cloud.recaptchaenterprise_v1 import Assessment

app = Flask(__name__)

# Your Project ID and reCAPTCHA site key
project_id = 'alien-house-423413-j6'  # Replace with your actual Google Cloud Project ID
recaptcha_key = '6LeAiTEqAAAAANLE-JQ2NjzdUIzQBn95q_KU16J9'  # Replace with your actual reCAPTCHA site key

# Function to create assessment
def create_assessment(project_id, recaptcha_key, token, recaptcha_action):
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    event = recaptchaenterprise_v1.Event(site_key=recaptcha_key, token=token)
    assessment = recaptchaenterprise_v1.Assessment(event=event)
    project_name = f"projects/{project_id}"
    request = recaptchaenterprise_v1.CreateAssessmentRequest(
        parent=project_name, assessment=assessment
    )

    response = client.create_assessment(request)

    if not response.token_properties.valid:
        return {"success": False, "reason": str(response.token_properties.invalid_reason)}

    if response.token_properties.action != recaptcha_action:
        return {"success": False, "reason": "Action mismatch"}

    return {
        "success": True,
        "score": response.risk_analysis.score,
        "reasons": [str(reason) for reason in response.risk_analysis.reasons],
    }

# API endpoint to verify reCAPTCHA
@app.route('/api/recaptcha', methods=['POST'])
def verify_recaptcha():
    data = request.json
    token = data.get('token')
    action = data.get('action')

    result = create_assessment(project_id, recaptcha_key, token, action)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
