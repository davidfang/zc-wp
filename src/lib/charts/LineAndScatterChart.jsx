"use strict";

import React from "react";
import d3 from "d3";

import ReStock from "react-stockcharts";

var { ChartCanvas, Chart, EventCapture } = ReStock;

var { BarSeries, LineSeries, AreaSeries, ScatterSeries, CircleMarker } = ReStock.series;
var { financeEODDiscontiniousScale } = ReStock.scale;
var { EdgeIndicator } = ReStock.coordinates;
var { MouseCoordinates } = ReStock.coordinates;

var { TooltipContainer, OHLCTooltip } = ReStock.tooltip;
var { XAxis, YAxis } = ReStock.axes;
var { fitWidth } = ReStock.helper;

var xScale = financeEODDiscontiniousScale();

class LineAndScatterChart extends React.Component {
	render() {
		var {data, type, width} = this.props;
		return (
			<ChartCanvas width={width} height={400}
					margin={{left: 30, right: 70, top:10, bottom: 30}} type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={d => d.date} discontinous xScale={xScale}
					xExtents={[data.slice(-50,-49)[0].date, data.slice(-1)[0].date]}>
				<Chart id={1}
						yExtents={d => [d.high, d.low]}
						yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")} >
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5} />
					<LineSeries yAccessor={d => d.close}/>
          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
				</Chart>
				<MouseCoordinates xDisplayFormat={d3.time.format("%Y-%m-%d")} />
				<EventCapture mouseMove={true} zoom={true} pan={true} />
				<TooltipContainer>
					<OHLCTooltip forChart={1} origin={[-40, 0]}/>
				</TooltipContainer>


			</ChartCanvas>
		);
	}
}

LineAndScatterChart.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChart.defaultProps = {
	type: "svg",
};
LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;
