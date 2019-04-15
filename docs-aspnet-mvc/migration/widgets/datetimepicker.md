---
title: DateTimePicker
page_title: DateTimePicker | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI DateTimePicker widget."
slug: datetimepicker_migrationextensions_aspnetmvc
---

# DateTimePicker Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI DateTimePicker widget.

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

### StartTime and EndTime

The `StartTime` and `EndTime` configuration options are not implemented in Kendo UI.

## Client-side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

### Disable

```Previous

    var datePicker = $("#DatePicker").data("tDateTimePicker");
    datePicker.disable();
```
```Current

    var datePicker = $("#datepicker").data("kendoDateTimePicker");
    datePicker.enable(false);
```

## See Also

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
