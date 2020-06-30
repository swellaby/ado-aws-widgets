import base64
import pytest
import json
from widgetfn.handler import get_widget


@pytest.fixture(autouse=True)
def setup_mocks(mocker):
    mocker.patch("botocore.client", autospec=True)
    mocker.patch("base64.b64encode", autospec=True).return_value = bytes()


def test_returns_error_if_missing_queryparams():
    res = get_widget({})
    assert res["statusCode"] == 400
    assert res["body"]["message"] == "widget must be provided"


def test_returns_error_if_missing_widget():
    res = get_widget({"queryStringParameters": {"fake": "stuff"}})
    assert res["statusCode"] == 400
    assert res["body"]["message"] == "widget must be provided"


def test_does_the_right_things():
    res = get_widget({"queryStringParameters": {"widget": "fake param"}})
    assert res["statusCode"] == 200
    assert res["headers"]["Access-Control-Allow-Origin"] == "*"
    assert res["headers"]["Access-Control-Allow-Headers"] == "*"
    assert res["headers"]["Content-Type"] == "image/png"
    assert res["body"] is not None


def test_handles_asstring():
    res = get_widget(
        {"queryStringParameters": {"widget": "fake param", "asstring": "true"}}
    )
    assert res["statusCode"] == 200
    assert res["headers"]["Content-Type"] == "application/json"
    assert "image" in json.loads(res["body"])
