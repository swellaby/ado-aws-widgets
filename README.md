# Azure DevOps AWS Widgets

Provides a widget for embedding cloudwatch widgets within Azure Devops dashboards.

![][preview-img]

## Setup
1. Deploy Serverless function (steps described below)
2. Create a service connection with API key and URL outputted from your deploy
3. Add widgets to dashboards!


## Widgets

![][w-build] ![][w-sonar-status] ![][w-sonar-coverage]

### Cloudwatch Widget
Use this widget to display widgets from cloudwatch. Widgets are defined using the syntax described [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/CloudWatch-Metric-Widget-Structure.html). If you dont want to make your json by hand, you can create the widgets in a cloudwatch dashboard and copy the json from there.

Size will be ignored if it is included in your widget definition and will be replaced with a size appropriate for the size of your tile.

## Widget Function

![][f-build] ![][f-sonar-status] ![][f-sonar-coverage]

In order to use this extension you must deploy a function to your AWS account for your widget to use.

### To Deploy

1. `git clone git@github.com:swellaby/ado-aws-widgets.git; cd ado-aws-widgets`
2. `npm i -g serverless`
3. `serverless login`
4. `cd widget-function; serverless deploy`

Note your API Key and URL so that you can configure your Azure DevOps widget.

### Permissions
By default the function will have permission to create widgets for anything in cloudwatch, you can restrict this behaviour by setting the `METRIC_TARGET` to resource you want to grant `cloudwatch:GetMetricWidgetImage` on environmental variable before deploying. If you modify this setting it will restrict the widgets that can be created.

The function is secured with an API Key, the api key is created as part of the deployment process.

[preview-img]: ./docs/dashboard.png
[f-build]: https://dev.azure.com/swellaby/OpenSource/_apis/build/status/ado-aws-widgets/ado-aws-widgets.function?branchName=master
[f-sonar-status]: https://sonarcloud.io/api/project_badges/measure?project=aws-widget-function&metric=alert_status
[f-sonar-coverage]: https://sonarcloud.io/api/project_badges/measure?project=aws-widget-function&metric=coverage
[w-build]: https://dev.azure.com/swellaby/OpenSource/_apis/build/status/ado-aws-widgets/ado-aws-widgets?branchName=master
[w-sonar-status]: https://sonarcloud.io/api/project_badges/measure?project=aws-widget&metric=alert_status
[w-sonar-coverage]: https://sonarcloud.io/api/project_badges/measure?project=aws-widget&metric=coverage
