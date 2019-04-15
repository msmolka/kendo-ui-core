---
title: Chart
page_title: Chart | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Chart widget."
slug: chart_migrationextensions_aspnetmvc
---

# Chart Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI Chart widget.

## Server-Side API

### Data Binding

The `DataBinding` configuration is moved to the `DataSource`.

```Previous

    Html.Telerik().Chart<SalesData>()
    .Name("Chart")
    .DataBinding(dataBinding => dataBinding.Ajax().Select("_AjaxBinding", "Chart"))
```
```Current

    Html.Kendo().Chart<SalesData>()
    .Name("Chart")
    .DataSource(ds => ds.Read(read => read.Action("_AjaxBinding", "Chart")))
```

## Client-Side API

### Events

Kendo UI Complete for ASP.NET MVC does not support action syntax, that is `“() => {}”`.

None of the widgets features the `OnLoad` event anymore. Use `$(document).ready()` instead.

```Previous

    .ClientEvents(events => events.OnError("onError"))
```
```Current

    .DataSource(ds => ds.Events(events => events.Error("error")))
```

## See Also

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
