package com.kendoui.spring.controllers.steplinecharts;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.StockDataPoint;

@Controller("dataviz-step_line_charts-grouped_data-controller")
@RequestMapping(value="/dataviz/step-line-charts/")
public class GroupedDataController {
    @RequestMapping(value = "/grouped-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/step-line-charts/grouped-data";
    }
    
    @RequestMapping(value = "/grouped-data/read", method = RequestMethod.POST)
    public @ResponseBody List<StockDataPoint> read() throws ParseException {
        return ChartDataRepository.StockData();
    }
}