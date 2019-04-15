---
title: Implement Custom Editors
page_title: Implement Custom Editors | Kendo UI Scheduler HtmlHelper for ASP.NET MVC for ASP.NET MVC
description: "Implement a custom editor similar to the build-in editor of a Kendo UI Scheduler in ASP.NET MVC applications."
slug: howto_implementcustomeditor_scheduleraspnetmvc
поситион: 0
---

# Implement Custom Editors

To see the example, refer to the project on how to [implement a custom editor similar to the build-in editor of a Kendo UI Scheduler](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/scheduler/scheduler-custom-editor) in ASP.NET MVC applications.

> **Important**
>
> Fields that do not come from the `ISchedulerEvent` interface preserve their exact names. Therefore, when the editor template refers to such a field, it has to apply those names instead. Fields from the `ISchedulerEvent` interface are automatically mapped to camelCase fields.

## See Also

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [SchedulerBuilder API Reference](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)

For more runnable examples on the Kendo UI Scheduler in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/scheduler/how-to/).
