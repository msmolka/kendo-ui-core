---
title: TimePicker
page_title: TimePicker | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI TimePicker widget."
slug: timepicker_migrationextensions_aspnetmvc
---

# TimePicker Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI TimePicker widget.

## Server-Side API

### Min Date

```Previous

    Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)

```
```Current

    Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)

```

### Max Date

```Previous

      Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)
```
```Current

      Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)
```

### Footer

```Previous

    Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)
```
```Current

    Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
```

## Client-Side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

#### Disable

```Previous

    var datePicker = $("#DatePicker").data("tTimePicker");
    datePicker.disable();
```
```Current

    var datePicker = $("#datepicker").data("kendoTimePicker");
    datePicker.enable(false);
```

## See Also

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
