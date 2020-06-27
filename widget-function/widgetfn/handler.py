from boto3 import client
import base64


def get_widget(event):
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

    res["statusCode"] = 200
    res["headers"]["Content-Type"] = "image/png"
    res["body"] = base64.b64encode(widget_img["MetricWidgetImage"])
    res["isBase64Encoded"] = True
    return res
