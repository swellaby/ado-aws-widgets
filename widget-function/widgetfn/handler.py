from boto3 import client
import base64
import json


def get_widget(event, context={}):
    res = {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    }
    try:
        widget_def = event["queryStringParameters"]["widget"]
    except KeyError:
        res["statusCode"] = 400
        res["body"] = {"message": "widget must be provided"}
        return res

    cloudwatch = client("cloudwatch")
    widget_img = cloudwatch.get_metric_widget_image(MetricWidget=widget_def)
    encoded_image = base64.b64encode(widget_img["MetricWidgetImage"])

    res["statusCode"] = 200
    if event["queryStringParameters"]["asstring"] == "true":
        res["headers"]["Content-Type"] = "application/json"
        res["body"] = json.dumps({"image": encoded_image.decode("utf-8")})
    else:
        res["headers"]["Content-Type"] = "image/png"
        res["body"] = encoded_image
        res["isBase64Encoded"] = True
    return res
