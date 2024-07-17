# Getting Started Locally Guide

1. use console in "infragistics-library" folder
    1. run "ng build infragistics-ui"

2. use console in "infragistics-library/dist/infragistics-ui"
    1. run "npm pack"

3. copy "infragistics-library-0.0.1.tgz" file from "infragistics-library/dist/infragistics-ui" to root folder of your app.

4. use console in your app root folder
    1. install the library by running "npm i infragistics-ui-0.0.1.tgz"

5. import the DigitalClockComponent in your module or standalone component and use it

# Input Properties

1. separator - this is the separator the clock will be expecting in your format and the separator it will display between the segments
    Example = & expects hh&mm&ss and displays 12 & 12 & 12
    Type = string
    Default Value = :

2. format - this is the format in which the clock will display the time
    Possible options:
        HH - Formats the hours field in 24-hours format with leading zero (00...23)
        H - Formats the hours field in 24-hours format without leading zero (0...23)
        hh - Formats the hours field in 12-hours format with leading zero (00...12)
        h - Formats the hours field in 24-hours format without leading zero (0...12)
        mm - Formats the minutes field with leading zero (00...59)
        m - Formats the minutes field without leading zero (0...59)
        ss - Formats the minutes field with leading zero (0...59)
        s - Formats the minutes field without leading zero (0...59)
        tt - Represents the AM/PM field (if tt passed, AM/PM field exists and vice versa)
    Combinations:
        All combinations between HH/H/hh/h/mm/m/ss/s are possible up to three fields separated with the provided separator (ex. HH:mm:ss, ss:mm:hh, hh:mm, ss:hh, etc)
        tt - the AM/PM option is only allowed at the end of the combinations. could be applied even if using 24-hour format if your case requires it (ex. hh:mm:ss:tt)
    Type = string
    Default Value = hh:mm:ss:tt

3. utcTimezone - this field if provided formats the clock timezone based on your input
    Possible Values:
        If not provided clock takes local timezone.
        If provided, it accepts only UTC and the variations +/- 1...12 (ex. UTC+1, UTC-8)
    Type = string | null
    Default Value = null

4. backgroundColor - this field if provided changes the background color of the number segments
    Possible Values:
        If not provided it used the default background color.
        If provided, it accepts all hex values of colors (ex. #33FF7A, #33CEFF)
    Type = string | null
    Default Value = null

5. digitColor - this field if provided changes the color of the digits
    Possible Values:
        If not provided it used the default digit color.
        If provided, it accepts all hex values of colors (ex. #33FF7A, #33CEFF)
    Type = string | null
    Default Value = null

6. clockColor - this field if provided changes the color of the clock(border stays black)
    Possible Values:
        If not provided it used the default clock color.
        If provided, it accepts all hex values of colors (ex. #33FF7A, #33CEFF)
    Type = string | null
    Default Value = null


# InfragisticsUi

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Code scaffolding

Run `ng generate component component-name --project infragistics-ui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project infragistics-ui`.
> Note: Don't forget to add `--project infragistics-ui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build infragistics-ui` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build infragistics-ui`, go to the dist folder `cd dist/infragistics-ui` and run `npm publish`.

## Running unit tests

Run `ng test infragistics-ui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
