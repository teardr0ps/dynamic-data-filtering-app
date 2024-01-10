# DynamicDataFilteringApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.
And using json-server and some mock data as datasource. For the filters, all available methods of the json-server API were utilized, specifically:

*Filters by categories (brand, size, color, etc.) 

*Range filters for price

Unfortunately, basic json-server does not support regular search by matches and have poor sorting (asc only), so only this filter is unavailable.

## Development server

Run `npm run start` for a dev server. The application will automatically run json-server instance and reload if you change any of the source files.

Navigate to `http://localhost:4200/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
