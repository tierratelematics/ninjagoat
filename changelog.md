# 4.6.0

Add clear method to settings manager

# 4.5.2

Avoid content-type forcing for multipart

# 4.5.0

Add method to remove a value from storage 

# 4.4.0

- Notify initial location when starting the application
- Dispose resources on MasterComponent's unmount

# 4.3.0

- Add support for dynamic import on Views
- Fix some bugs for HMR

# 4.2.0

Add support for Blob types on http response

# 4.1.3

Fix check for viewmodel existance

# 4.1.2

Fix return value of methods decorated with Refresh

# 4.1.1

Add application prefix in NavigationManager

# 4.1.0

Add support for serving the application under a prefix

# 4.0.3

Avoid duplicated lodash versions

# 4.0.2

Expose updates method of IModelController

# 4.0.0 - 4.0.1

Update React to v16
Fix React types

# 3.0.0

Keep only the controller registrations

# 2.8.3

Avoid multiple slashes in URLs

# 2.8.0 - 2.8.1

Add contextual logging

# 2.7.0

Add ability to extend props of View

# 2.6.0

* Observable controller
* Fluent registration of viewmodels

# 2.5.2

Move types to dev deps

# 2.5.1

Bugfix on viewmodel lookup

# 2.5.0

* Extendable ViewModels factory
* Ability to register notifyBy clause

# 2.4.0

* Update react types
* Add lazyMultiInject

# 2.3.4

Fix router types

# 2.3.3

Export ViewModelFactory

# 2.3.2

Fix the updates of viewmodels when using react's context

# 2.3.1

Trigger the updates of PresentationViewModel correctly

# 2.3.0

React router is no more a peer dependency

# 2.2.0

Move to typescript 2.3

# 2.1.2

Bump bivio version

# 2.1.1

Fix http client request headers merge and 204 management

# 2.1.0

Add inversify lazy inject

# 2.0.1

Fix lodash types

# 2.0.0

* internal refactor
* parse json only with the right content type
* throw httpResponse instead of json
* remove IBaseConfig

# 1.0.0

Remove bluebird

# 0.15.1

Make refresh decorator work this standard Promise

# 0.15.0

* typescript 2.1 support
* update to smild 4

# 0.14.0

* add async interface for settings manager
* add IRouteStrategy

# 0.13.2

Export object container types

# 0.13.1

Access bivio components from ninjagoat

# 0.13.0

Add feature toggle from *bivio* ([spec](https://github.com/tierratelematics/ninjagoat/blob/master/test/ApplicationSpec.ts))