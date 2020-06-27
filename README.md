# Azure DevOps AWS Widgets

Provides a widget for embedding cloudwatch widgets within Azure Devops dashboards.

## Cloudwatch Widget

Coming Soon!

## Widget Function
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
