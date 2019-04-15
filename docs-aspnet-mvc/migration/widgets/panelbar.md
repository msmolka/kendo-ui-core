---
title: PanelBar
page_title: PanelBar | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI PanelBar widget."
slug: panelbar_migrationextensions_aspnetmvc
---

# PanelBar Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI PanelBar widget.

## Server-Side API

### Animations

```Previous

    Html.Telerik().PanelBar().Name("SamplePanelBar").Effects(effects => effects.Slide())
```
```Current

    Html.Kendo().PanelBar().Name("SamplePanelBar").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
```

## Client-Side API

### Events

Kendo UI Complete for ASP.NET MVC does not support action syntax&mdash;that is, `“() => {}”`.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

```Previous

    Html.Telerik().PanelBar().Name("SamplePanelBar").ClientEvents(events => events.OnChange(“change”))
```
```Current

    Html.Kendo().PanelBar().Name("SamplePanelBar").Events(events => events.Change(“change”))
```

## See Also

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
