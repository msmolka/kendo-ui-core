package com.kendoui.spring.controllers.stepareacharts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-step_area_charts-home-controller")
@RequestMapping(value="/dataviz/step_area-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step_area-charts/index";
    }
}