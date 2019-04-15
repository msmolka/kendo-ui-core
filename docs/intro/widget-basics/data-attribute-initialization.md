---
title: Data Attributes
page_title: Data Attributes | Kendo UI Getting Started
previous_url: /framework/data-attribute-initialization
description: "Initialize and configure each Kendo UI widget using data attributes."
slug: dataattributes_configuration_installation
position: 2
---

# Data Attributes

In addition to the [jQuery plug-in widget initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}), each Kendo UI control may be initialized and configured through the `data` attributes.

The Kendo UI Hybrid Application, the [Single-Page-Application (SPA) `view` component]({% slug viewclass_kendoui_singlepageapplication %}), and the [Model View View-Model (MVVM) `kendo.bind` method]({% slug overview_mvvmpattern_kendoui %}) use the declarative approach to automatically instantiate multiple widgets in an existing DOM element.

## Overview

Initialization from `data` attributes is convenient when there are a lot of Kendo UI widgets on the page because the widget configuration is declared within the target element.

The following example demonstrates how to initialize a Kendo UI widget by using the `data` attributes.

###### Example

    <div id="container">
        <input data-role="numerictextbox" />
    </div>

    <script>
    kendo.bind($("#container"), {});
    </script>

The `kendo.bind($("#container"))` statement finds all elements that have the `role` data attribute set and initializes the respective Kendo UI widgets.

> **Important**
>
> The value of the `role` data attribute is the lower-case name of the widget&mdash;`"autocomplete"`, `"dropdownlist"`, and so on.

## Getting Started

You can initialize widgets from `data` attributes in hybrid applications and within given elements, and then also configure the `data-*` options.

### Initialize in Hybrid Application

By default, to avoid ambiguity, `kendo.bind` initializes only widgets from the `kendo.ui` namespace, excluding the hybrid widgets. This behavior can be changed by passing additional namespaces as parameters. Note that the [hybrid Kendo UI Application](/controls/hybrid/application) initializes widgets from the `kendo.mobile.ui` namespace first. This means that an element with `data-role="listview"` is automatically initialized as a hybrid ListView widget in the hybrid Application context.

> **Important**
>
> The `data-role` attribute also accepts a full widget class name (with its namespace) as a value.

The following example demonstrates how to instantiate a Kendo UI ListView in a hybrid Application by using the full class path of the widget.

###### Example

    <div data-role="view">
        <!-- specify the Kendo UI Web ListView widget -->
        <div data-role="kendo.ui.ListView"></div>
    </div>
    <script>
    var app = new kendo.mobile.Application();
    </script>

### Initialize in Given Elements

The following example demonstrates how to instantiate Kendo UI widgets in a given element.

###### Example

    <div id="container">
        <input data-role="numerictextbox" />
        <button data-role="button">Mobile button</button>
    </div>
    <script>
    kendo.bind($("#container"), {}, kendo.ui, kendo.mobile.ui);
    </script>

### Set data-* Options

Each configuration option can be set with the `data` attribute of the target element. Add the `"data-"` prefix to the name of the configuration option and specify the option value&mdash;for example, `data-delay="100"`.

> **Important**
>
> The camelCase options are set through dash-separated attributes. For example, the [`ignoreCase`](/api/javascript/ui/autocomplete/configuration/ignorecase) option of the AutoComplete is set through `data-ignore-case`.

Options which start with `data` do not require an additional `"data"` in the attribute name. For example, the `dataTextField` option is set through the `data-text-field` attribute and `dataSource` is set through the `data-source` attribute.

Complex configuration options are set as JavaScript object literals&mdash;for example, `data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}"`.

The following example demonstrates how to configure Kendo UI widgets with data attributes.

###### Example

    <div id="container">
        <input data-role="autocomplete"
               data-ignore-case="true"
               data-text-field="name"
               data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}" />
    </div>

    <script>
        kendo.bind($("#container"), {});
    </script>

## Events

You are able to subscribe to Kendo UI widget events with data attributes. The value of the data attribute is resolved to a JavaScript function, available in the global scope.

### Subscribe to Widget Events

The following example demonstrates how to subscribe to a Kendo UI widget event through a `data` attribute.

###### Example

    <div id="container">
        <input data-role="numerictextbox" data-change="numerictextbox_change" />
    </div>

    <script>
        function numerictextbox_change(e) {
            // Handle the "change" event
        }
        kendo.bind($("#container"));
    </script>

You can also set event handlers to member functions. For example, an event `data` attribute can be set to `foo.bar`, which is resolved as the `bar` method of the `foo` object available in the global scope.

### Use Member Function as Event Handler

The following example demonstrates how to use a member function as an event handler.

###### Example

    <div id="container">
        <input data-role="numerictextbox" data-change="handler.numerictextbox_change" />
    </div>
    <script>
    var handler = {
        numerictextbox_change: function (e) {
            // Handle the "change" event
        }
    };
    kendo.bind($("#container"));
    </script>

## DataSource

The Data Source of data-bound Kendo UI widgets can also be set through a data attribute. The value can be a JavaScript object, array, or a variable available in the global scope.

### Set DataSource to Objects

The following example demonstrates how to set the data source of a Kendo UI widget to a JavaScript object.

###### Example

    <div id="container">
        <input data-role="autocomplete" data-source="{data:['One', 'Two']}" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

### Set DataSource to Arrays

The following example demonstrates how to set the data source of a Kendo UI widget to a JavaScript array.

###### Example

    <div id="container">
        <input data-role="autocomplete" data-source="['One', 'Two']" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

### Set DataSource to Variables

The following example demonstrates how to set the data source of a Kendo UI widget to a variable available in the global scope.

###### Example

    <div id="container">
        <input data-role="autocomplete" data-source="dataSource" />
    </div>
    <script>
    var dataSource = new kendo.data.DataSource( {
        data: [ "One", "Two" ]
    });
    kendo.bind($("#container"));
    </script>

## Templates

Template configuration can be set through data attributes as well. The attribute value is resolved as the `id` attribute of a `script` element with the
template contents.

The following example demonstrates how to set the template of a Kendo UI widget.

###### Example

    <div id="container">
        <input data-role="autocomplete"
               data-source="[{firstName:'John', lastName: 'Doe'}, {firstName:'Jane', lastName: 'Doe'}]"
               data-text-field="firstName"
               data-template="template" />
    </div>

    <script id="template" type="text/x-kendo-template">
        <span>#: firstName # #: lastName #</span>
    </script>

    <script>
        kendo.bind($("#container"));
    </script>

## See Also

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
