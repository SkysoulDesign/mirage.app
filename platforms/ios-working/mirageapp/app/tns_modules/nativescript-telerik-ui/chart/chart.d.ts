/**
* The chart module defines all types needed to setup a Cartesian or Pie chart with
* a legend and different customizations.
*/
declare module "chart" {
    import * as dependencyObservable from "ui/core/dependency-observable";
    import * as observableModule from "data/observable";
    import * as bindable from "ui/core/bindable";
    
    /**
    * This class is a base for all types of charts. It provides common properties
    * like {@link palette} and {@link legend}.
    */
    class RadChartBase {

        /**
        * This event is fired after selecting a series.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static seriesSelectedEvent: string;
        
        /**
        * This event is fired after deselecting a series.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static seriesDeselectedEvent: string;
        
        /**
        * This event is fired after selecting a point in series.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static pointSelectedEvent: string;
        
        /**
        * This event is fired after deselecting a point in series.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static pointDeselectedEvent: string;
        
        /**
        * This event is fired after zooming the chart.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static chartZoomFinishedEvent: string;

        /**
        * This event is fired after panning the chart.
        * The event exposes an instance of the {@link ChartEventData} class.
        */
        static chartPanFinishedEvent: string;

        /**
        * Identifies the {@link legend} dependency property.
        */
        public static legendProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link palette} dependency property.
        */
        public static paletteProperty: dependencyObservable.Property;

        /**
        * Identifies the series dependency property.
        */
        public static seriesProperty: dependencyObservable.Property;

        /**
        * Gets or sets the series collection associated with this chart.
        */
        series: Array<ChartSeries>;

        /**
        * Gets or sets the palettes collection associated with this chart.
        */
        palettes: Array<Palette>;

        /**
        * Gets or sets an instance of the {@link RadLegendView} class representing
        * the legend associated with this class.
        */
        legend: RadLegendView;
    }

    /*
    * Defines the different places where the legend can be positioned.
    */
    export enum ChartLegendPosition {
        /**
         * The legend is positioned at the left side of the chart.
         */
        Left,     
        /**
         * The legend is positioned at the right side of the chart.
         */
        Right,
        /**
         * The legend is positioned at the top side of the chart.
         */
        Top,
        /**
         * The legend is positioned at the bottom side of the chart.
         */
        Bottom,
        /**
         * The legend is floating. 
         */
        Floating
    }

    /**
    * This class represents the Chart legend. You can use this class to show a legend
    * in your chart, as well as customize its behavior.
    */
    export class RadLegendView {

        /**
        * Identifies the position dependency property.
        */
        public static positionProperty: dependencyObservable.Property;
        
        /**
        * Identifies the legend title dependency property.
        */
        public static titleProperty: dependencyObservable.Property;
        
        /**
         *  The title of the legend.
         */ 
        title: string;

        /**
         *  The position of the legend.
         */ 
        position : ChartLegendPosition;
    }

    /**
    * Represents a Cartesian Chart that uses the cartesian coordinate system to plot
    * the data point values.
    */
    export class RadCartesianChart extends RadChartBase {
        android: com.telerik.widget.chart.visualization.cartesianChart.RadCartesianChartView;

        /**
        * Identifies the {@link horizontalAxis} dependency property.
        */
        public static horizontalAxisProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalAxis} dependency property.
        */
        public static verticalAxisProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link grid} dependency property.
        */
        public static gridProperty: dependencyObservable.Property;

        /**
        * Gets or sets the horizontal axis associated with this chart.
        */
        horizontalAxis: CartesianAxis;

        /**
        * Gets or sets the vertical axis associated with this chart.
        */
        verticalAxis: CartesianAxis;

        /**
        * Gets or sets the grid associated with this chart.
        */
        grid: RadCartesianChartGrid;
    }

    /**
    * Represents a chart that visualizes its values as a slices of a pie. Depending on the
    * associated series the values are visualized as a standard pie or a doughnut.
    */
    export class RadPieChart extends RadChartBase {
    }

    /**
    * A base class for all cartesian axes .
    */
    class CartesianAxis {
        constructor();

        /**
         * Identifies the id dependency property of each axis.
         */
        public static idProperty: dependencyObservable.Property;

        /**
        * Identifies the horizontalLocation dependency property.
        */
        public static horizontalLocationProperty: dependencyObservable.Property;

        /**
        * Identifies the verticalLocation dependency property.
        */
        public static verticalLocationProperty: dependencyObservable.Property;

        /**
        * Identifies the labelSize dependency property.
        */
        public static labelSizeProperty: dependencyObservable.Property;

        /**
        * Identifies the labelFormat dependency property.
        */
        public static labelFormatProperty: dependencyObservable.Property;

        /**
        * Identifies the labelMargin dependency property.
        */
        public static labelMarginProperty: dependencyObservable.Property;

        /**
        * Identifies the labelRotationAngle dependency property.
        */
        public static labelRotationAngleProperty: dependencyObservable.Property;

        /**
        * Identifies the labelFitMode dependency property.
        */
        public static labelFitModeProperty: dependencyObservable.Property;

        /**
        * Identifies the labelTextColor dependency property.
        */
        public static labelTextColorProperty: dependencyObservable.Property;

        /**
        * Identifies the lineColor dependency property.
        */
        public static lineColorProperty: dependencyObservable.Property;

        /**
        * Identifies the lineThickness dependency property.
        */
        public static lineThicknessProperty: dependencyObservable.Property;

        /**
        * Identifies the allowPan dependency property.
        */
        public static allowPanProperty: dependencyObservable.Property;

        /**
        * Identifies the allowZoom dependency property.
        */
        public static allowZoomProperty: dependencyObservable.Property;

        /**
         * Gets or sets the id for this axis.
         */
        id: string;

        /**
        * Gets or sets the horizontal location of the axis.
        */
        horizontalLocation: AxisHorizontalLocation;

        /**
        * Gets or sets the vertical location of the axis.
        */
        verticalLocation: AxisVerticalLocation;

        /**
        * Gets or sets the size of the text labels displayed by the axis.
        */
        labelSize: number

        /**
        * Gets or sets the format of the labels displayed by the axis.
        */
        labelFormat: string;

        /**
        * Gets or sets the margin of axis label.
        */
        labelMargin: number;

        /**
         * Gets or sets the rotation angle for axis labels. Requires "Rotation" fit mode for labelFitMode property to be set.
         */
        labelRotationAngle: number;
        
        /**
         * Gets or sets the fit mode for axis labels.
         */
        labelFitMode: AxisLabelFitMode;
        
        /**
        * Gets or sets the color of the labels displayed by the chart.
        */
        labelTextColor: string;

        /**
        * Gets or sets the color of the axis line.
        */
        lineColor: string;

        /**
        * Gets or sets the thickness of the axis line.
        */
        lineThickness: number;
        
        /**
        * Enables the pan gesture on the axis.
        */
        allowPan: boolean;

        /**
        * Enables chart zoom gesture on the axis.
        */
        allowZoom: boolean;
    }

    /*
    * The possible values for label fit modes
    */
    export enum AxisLabelFitMode {
        /**
         * The default single line mode 
         */
        None,
        /**
         * Axis labels are on multiple lines.
         */
        Multiline,
        /**
         * Axis labels are rotated. Use labelRotationAngle to set the corresponding rotation angle.
         */
        Rotate
    }

    /**
    * Lists the possible location values for the horizontal positioning of a vertical axis.
    */
    export enum AxisHorizontalLocation {
        /**
        * The axis is positioned at the left side of the plotting area.
        */
        Left,

        /**
        * The axis is positioned at the right side of the plotting area.
        */
        Right
    }

    /**
    * Lists the possible location values for the vertical positioning of a horizontal axis.
    */
    export enum AxisVerticalLocation {
        /**
        * The axis is positioned at the top of the plotting area.
        */
        Top,

        /**
        * The axis is positioned at the bottom of the plotting area.
        */
        Bottom
    }

    /**
    * Lists the possible axis plot modes.
    */
    export enum AxisPlotMode {
        /**
        * Data points are plotted between the ticks.
        */
        BetweenTicks,

        /**
        * Data points are plotted on the ticks.
        */
        OnTicks,
        OnTicksPadded
    }

    /**
    * Lists the possible ways a DateTime value can be interpreted
    * in the context of an axis.
    */
    export enum DateTimeComponent {

        /**
        * The 'seconds' value of the DateTime object will be considered.
        */
        Second,

        /**
        * The 'minutes' value of the DateTime object will be considered.
        */
        Minute,

        /**
        * The 'hours' value of the DateTime object will be considered.
        */
        Hour,

        /**
        * The 'days' value of the DateTime object will be considered.
        */
        Day,

        /**
        * The 'weeks' value of the DateTime object will be considered.
        */
        Week,

        /**
        * The 'months' value of the DateTime object will be considered.
        */
        Month,

        /**
        * The 'years' value of the DateTime object will be considered.
        */
        Year
    }

    /**
    * Represents a linear axis within a cartesian chart. A Linear axis plots its values
    * according to the datapoint's relative position between a minimum and a maximum.
    */
    export class LinearAxis extends CartesianAxis {
        /**
        * Creates an instance of the {@link LinearAxis} class.
        */
        constructor();

        /**
        * Identifies the minimum dependency property.
        */
        public static minimumProperty: dependencyObservable.Property;

        /**
        * Identifies the maximum dependency property.
        */
        public static maximumProperty: dependencyObservable.Property;

        /**
        * Gets or sets a user-defined minimum for the axis.
        */
        minimum: number;

        /**
        * Gets or sets a user-defined maximum for the axis.
        */
        maximum: number;
    }

    /**
    * Represents a categorical axis within a cartesian chart.
    */
    export class CategoricalAxis extends CartesianAxis {
        /**
        * Creates an instance of the {@link CategoricalAxis} class.
        */
        constructor();

        /**
        * Gets or sets the major tick interval.
        */
        majorTickInterval: number;

        /**
        * Gets or sets the gap length tick interval.
        */
        gapLength: number;

        /**
        * Gets or sets plot mode for the axis.
        */
        plotMode: AxisPlotMode;
    }

    /**
    * Represents a date-time categorical axis  within a cartesian chart.
    */
    export class DateTimeCategoricalAxis extends CategoricalAxis {

        /**
        * Creates an instance of the {@link DateTimeCategoricalAxis} class.
        */
        constructor();

        /**
        * Identifies the dateTimeComponent dependency property.
        */
        public static dateTimeComponentProperty: dependencyObservable.Property;

        /**
        * Identifies the dateFormat dependency property.
        */
        public static dateFormatProperty: dependencyObservable.Property;

        /**
        * Gets or sets the date display format string.
        */
        dateFormat: string;

        /**
        * Gets or sets the date-time component which will be used to plot the values.
        */
        dateTimeComponent: DateTimeComponent;
    }

    /**
    * Represents a logarithmic axis within a cartesian chart.
    */
    export class LogarithmicAxis extends LinearAxis {

        /**
        * Creates an instance of the {@link LogarithmicAxis} class.
        */
        constructor();

        /**
        * Identifies the {@link exponentStep} dependency property.
        */
        public static exponentStepProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link logarithmBase} dependency property.
        */
        public static logarithmBaseProperty: dependencyObservable.Property;

        /**
         * Sets the exponent step between each axis tick.
         * By default the axis itself will calculate the exponent step, depending on the plotted data points.
         * You can reset this property by setting it to 0 to restore the default behavior.
         */
        logarithmBase: number;

        /**
        * Gets or sets the super of the logarithm used for normalizing data points' values.
        */
        exponentStep: number;
    }

    /**
    * Represents the base class for all series supported by the Chart.
    */
    class ChartSeries {
        /**
        * Identifies the {@link items} dependency property.
        */
        public static itemsProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link value} dependency property.
        */
        public static valueProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link legendTitle} dependency property.
        */
        public static legendTitleProperty: dependencyObservable.Property;

        /**
        * Gets or sets a collection of objects used to initialize the series.
        */
        items: any;

        /**
        * Gets or sets a title for this series which will be used in the legend.
        */
        legendTitle: string;

        /**
        * Gets or sets the name of the property on the business entity which will
        * be used to plot it on the provided axis.
        */
        valueProperty: string;

        android: any;
    }

    /**
    * This class is a base for all series that work with a Cartesian coordinate
    * system.
    */
    class CartesianSeries extends ChartSeries {
        /**
        * Identifies the {@link horizontalAxis} dependency property.
        */
        public static horizontalAxisProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalAxis} dependency property.
        */
        public static verticalAxisProperty: dependencyObservable.Property;

        /**
        * Gets or sets the horizontal axis associated with the this series.
        */
        horizontalAxis: CartesianAxis;

        /**
        * Gets or sets the vertical axis associated with the this series.
        */
        verticalAxis: CartesianAxis;
    }

    /**
    * The {@link OhlcSeries} class is used to represent financial data using the
    * Open-High-Low-Close standard: {@link https://en.wikipedia.org/wiki/Open-high-low-close_chart}.
    */
    export class OhlcSeries extends CartesianSeries {
        /**
        * Creates an instance of the {@link OhlcSeries} class.
        */
        constructor();

        /**
        * Identifies the {@link openPropertyName} dependency property.
        */
        public static openPropertyNameProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link closePropertyName} dependency property.
        */
        public static closePropertyNameProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link highPropertyName} dependency property.
        */
        public static highPropertyNameProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link lowPropertyName} dependency property.
        */
        public static lowPropertyNameProperty: dependencyObservable.Property;

        /**
        * Gets or sets the name of the property defined on the data-source object
        * which will be used to acquire the 'open' value used for plotting the datapoint.
        */
        openPropertyName: string;

        /**
        * Gets or sets the name of the property defined on the data-source object
        * which will be used to acquire the 'close' value used for plotting the datapoint.
        */
        closePropertyName: string;

        /**
        * Gets or sets the name of the property defined on the data-source object
        * which will be used to acquire the 'high' value used for plotting the datapoint.
        */
        highPropertyName: string;

        /**
        * Gets or sets the name of the property defined on the data-source object
        * which will be used to acquire the 'low' value used for plotting the datapoint.
        */
        lowPropertyName: string;

    }

    /**
    * The {@link OhlcSeries} class is used to represent financial data using the
    * Open-High-Low-Close standard: {@link https://en.wikipedia.org/wiki/Open-high-low-close_chart}.
    */
    export class CandlestickSeries extends OhlcSeries {

        /**
        * Creates an instance of the {@link CandlestickSeries} class.
        */
        constructor();
    }

    /**
    * This is a base for all categorical series. This class exposes common properties
    * for this type of series like: {@link categoryProperty} and {@link stackMode}.
    */
    class CategoricalSeries extends CartesianSeries {
        /**
        * Identifies the categoryProperty dependency property.
        */
        public static categoryPropertyProperty: dependencyObservable.Property;

        /**
        * Identifies the stackMode dependency property.
        */
        public static stackModeProperty: dependencyObservable.Property;

        /**
        * Gets or sets the name of the property which returns the value
        * used for plotting the data object on a categorical axis.
        */
        categoryProperty: string;

        /**
        * Gets or sets the mode in which the series are stacked in case multiple
        * series are defined in the chart.
        */
        stackMode: string;
    }

    /**
    * Defines series that represent the data as a Pie separated in segments
    * corresponding to each data object from the source.
    */
    export class PieSeries extends ChartSeries {
        /**
        * Creates an instance of the {@link PieSeries} class.
        */
        constructor();
        
        /**
         * Identifies the expandRadius dependency property.
         */
        public static expandRadiusProperty: dependencyObservable.Property;
     
        /**
         * Identifies the outerRadius dependency property.
         */
        public static outerRadiusFactorProperty: dependencyObservable.Property;   
        
        /**
         * Identifies the startAngle dependency property.
         */
        public static startAngleProperty: dependencyObservable.Property;
        
        /**
         * Identifies the endAngle dependency property.
         */
        public static endAngleProperty: dependencyObservable.Property;
        
        /**
         * The pie series radius factor. Valid values are between 0 and 1.
         */
        outerRadiusFactor: number;
        
        /**
         * The radius factor to which a pie slice will expand when selected. 
         */
        expandRadius: number;
        
        /**
         * The start angle of the series. Use this property along with endAngle to define a pie segment that will be used to present all points in this series. 
         * By default, the startAngle property is 0 degrees. 
         */
        startAngle: number;
        
        /**
         * The end angle of the series. Use this property along with startAngle to define a pie segment that will be used to present all points in this series. 
         * By default, the endAngle property is 360 degrees.
         */
        endAngle: number;
    }

    /**
    * Defines series that represent the data as a Donut separated in segments
    * corresponding to each data object from the source.
    */
    export class DonutSeries extends PieSeries {
        /**
        * Creates an instance of the {@link PieSeries} class.
        */
        constructor();
        
        /**
         * Identifies the innerRadiusFactor dependency property.
         */
        public static innerRadiusFactorProperty: dependencyObservable.Property;
        
        /**
         * The inner radius of the donut series. A non-zero radius produces a donut chart.
         * Valid values are between 0 and 1. 
         */
        innerRadiusFactor: number;
    }


    /**
    * Defines series that represent the data as points connected with lines.
    */
    export class LineSeries extends CategoricalSeries {
        /**
        * Creates an instance of the {@link LineSeries}.
        */
        constructor();
    }

    /**
    * Defines series that represent the data as bars which height corresponds
    * to the value of the data object from the source.
    */
    export class BarSeries extends CategoricalSeries {
        /**
        * Creates an instance of the {@link BarSeries}.
        */
        constructor();
    }

    /**
    * Defines series that represent the data as points connected with a spline.
    */
    export class SplineSeries extends CategoricalSeries {
        /**
        * Creates an instance of the {@link SplineSeries} class.
        */
        constructor();
    }

    /**
    * Defines series that represent the data as points connected with a line which
    * encloses the area between the line and the axis.
    */
    export class AreaSeries extends CategoricalSeries {
        /**
        * Creates an instance of the {@link AreaSeries} class.
        */
        constructor();
    }

    /**
    * Defines series that represent the data as points connected with a spline which
    * encloses the area between the line and the axis.
    */
    export class SplineAreaSeries extends AreaSeries {

        /**
        * Creates an instance of the {@link SplineAreaSeries} class.
        */
        constructor();

    }

    /**
    * Represents a categorical bubble series. This type of chart series uses 3 parameters
    * from the business entity to visualize the data points - category, Y-value and size of
    * the bubble.
    */
    export class BubbleSeries extends CategoricalSeries {

        /**
        * Identifies the {@link bubbleScale} dependency property.
        */
        public static bubbleScaleProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link bubbleSizePropertyName} dependency property.
        */
        public static bubbleSizePropertyNameProperty: dependencyObservable.Property;

        /**
        * Gets or sets the size-scale applied to each data point to adjust the bubble size.
        */
        bubbleScale: number;

        /**
        * Gets or sets the name of the property on the business entity used to determine
        * the size of each bubble.
        */
        bubbleSizePropertyName: string;
    }


    /**
    * Represents a grid in a cartesian chart. A cartesian grid draws vertical and horizontal
    * lines aligned to each tick from the vertial or horizontal axis.
    */
    export class RadCartesianChartGrid {

        /**
        * Identifies the {@link horizontalStrokeColor} dependency property.
        */
        public static horizontalStrokeColorProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalStrokeColor} dependency property.
        */
        public static verticalStrokeColorProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link horizontalStrokeWidth} dependency property.
        */
        public static horizontalStrokeWidthProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalStrokeWidth} dependency property.
        */
        public static verticalStrokeWidthProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalStripLineColor} dependency property.
        */
        public static verticalStripLineColorProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link horizontalStripLineColor} dependency property.
        */
        public static horizontalStripLineColorProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalLinesVisible} dependency property.
        */
        public static verticalLinesVisibleProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link horizontalLinesVisible} dependency property.
        */
        public static horizontalLinesVisibleProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link verticalStripLinesVisible} dependency property.
        */
        public static verticalStripLinesVisibleProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link horizontalStripLinesVisible} dependency property.
        */
        public static horizontalStripLinesVisibleProperty: dependencyObservable.Property;

        /**
        * Gets or sets the color used to draw the horizontal lines of the grid.
        */
        horizontalStrokeColor: string;

        /**
        * Gets or sets the color used to draw the vertical lines of the grid.
        */
        verticalStrokeColor: string;

        /**
        * Gets or sets the thickness of the horizontal lines.
        */
        horizontalStrokeWidth: number;

        /**
        * Gets or sets the thickness of the vertical lines.
        */
        verticalStrokeWidth: number;

        /**
        * Gets or sets the color of the fill drawn between the horizontal lines. Multiple
        * colors can be defined by separating them with commas (e.g. "red, green, #ff32a4bb").
        */
        horizontalStripLineColor: string;

        /**
        * Gets or sets the color of the fill drawn between the horizontal lines. Multiple
        * colors can be defined by separating them with commas (e.g. "red, green, #ff32a4bb").
        */
        verticalStripLineColor: string;

        /**
        * Gets or sets a boolean value determining whether vertical grid lines are visible.
        */
        verticalLinesVisible: boolean;

        /**
        * Gets or sets a boolean value determining whether horizontal grid lines are visible.
        */
        horizontalLinesVisible: boolean;

        /*
        * Gets or sets a boolean value determining whether vertical strip lines are visible.
        */
        verticalStripLinesVisible: boolean;

        /**
        * Gets or sets a boolean value determining whether horizontal strip lines are visible.
        */
        horizontalStripLinesVisible: boolean;

        android: com.telerik.widget.chart.visualization.cartesianChart.CartesianChartGrid;
        ios: any;
    }

    /**
    * Represents a palette that can be associated with a chart to visually style
    * the series defined in it.
    */
    export class Palette {

        /**
        * Identifies the {@link entries} dependency property.
        */
        public static entriesProperty: dependencyObservable.Property;

        /**
        * Identifies the {@link seriesName} dependency property.
        */
        public static seriesNameProperty: dependencyObservable.Property;

        /**
        * Gets or sets a collection of PaletteEntry instances that represent the palette.
        * A PaletteEntry is a property bag containing values for common style-related
        * properties that are applied to a single series within a chart.
        */
        entries: Array<PaletteEntry>;

        /**
        * Gets or sets the name of the series to which this palette will be applied.
        */
        seriesName: string;
    }

    /**
    * A PaletteEntry is a property bag containing values for common style-related
    * properties that are applied to a single series within a chart.
    */
    export class PaletteEntry {

        /**
        * Identifies the fillColor dependency property.
        */
        public static fillColorProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeColor dependency property.
        */
        public static strokeColorProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeWidth dependency property.
        */
        public static strokeWidth: dependencyObservable.Property;

        /**
        * Gets or sets the color associated with fills.
        */
        fillColor: string;

        /**
        * Gets or sets the color associated with lines/strokes.
        */
        strokeColor: string;

        /**
        * Gets or sets the thickness used to draw a line/stroke.
        */
        strokeWidth: number;
    }


    /**
    * The annotation's position according to the series.
    */
    export enum ChartAnnotationZPosition {
        /**
        * The annotation is rendered below the series (default).
        */
        BellowSeries,
        /**
        * The annotation is rendered above the series.
        */
        AboveSeries
    }

    /**
    *   The base class for annotations.
    */
    class CartesianChartAnnotation extends bindable.Bindable {
        /**
        * Identifies the axisID dependency property.
        */
        public static axisIdProperty: dependencyObservable.Property;

        /**
        * Identifies the zPosition dependency property.
        */
        public static zPositionProperty: dependencyObservable.Property;

        /**
        * Identifies the hidden dependency property.
        */
        public static hiddenProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeWidth dependency property.
        */
        public static strokeWidthProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeColor dependency property.
        */
        public static strokeColorProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeDashPattern dependency property.
        */
        public static strokeDashPatternProperty: dependencyObservable.Property;

        /**
        *  The axis to which this annotation belongs.
        */
        axisId: string;
        
        /**
        * Determines the z-order position of the annotation. Every annotation can be positioned below or above the series collection.  
        */
        zPosition: string;
        
        /**
        *  Indicates whether the annotation is visible.
        */
        hidden: boolean;
        
        /** 
        *  The stroke's width.
        */
        strokeWidth: number;
        
        /** 
        * The stroke's fill color
        */
        strokeColor: string;
        
        /**
        *  The dash patterns of the stroke. An string with numbers that specify the lengths of the painted segments and unpainted segments, respectively, of the dash pattern.
        *  For example, the string "2, 3"" sets a dash pattern that alternates between a 2-user-space-unit-long painted segment and a 3-user-space-unit-long unpainted segment. 
        *  The string "1, 3, 4, 2"" sets the pattern to a 1-unit painted segment, a 3-unit unpainted segment, a 4-unit painted segment, and a 2-unit unpainted segment.
        */
        strokeDashPattern: string;
    }

    /**
     * A vertical or horizontal line annotation.
     */
    export class ChartGridLineAnnotation extends CartesianChartAnnotation {

        /**
        * Identifies the value dependency property.
        */
        public static valueProperty: dependencyObservable.Property;
       
        /**
        *  The value used when positioning the annotation.
        */
        value: any;
    }
    
    /**
    *  A band annotation. The band specifies a horizontal or vertical range of specific axis.
    */
    export class ChartPlotBandAnnotation extends CartesianChartAnnotation {

        /**
        * Identifies the minValue dependency property.
        */
        public static minValueProperty: dependencyObservable.Property;

        /**
        * Identifies the maxValue dependency property.
        */
        public static maxValueProperty: dependencyObservable.Property;

        /**
        * Identifies the fillColor dependency property.
        */
        public static fillColorProperty: dependencyObservable.Property;
      
        /** 
        *  The min value of range used when positioning the annotation.
        */
        minValue: any;
      
        /** 
        *  The max value of range used when positioning the annotation.
        */
        maxValue: any;
      
        /**
        *  The vertical band fill.
        */
        fillColor: string;
    }

    export class PointLabelStyle extends bindable.Bindable {
   
        /**
        * Identifies the fillColor dependency property.
        */
        public static fillColorProperty: dependencyObservable.Property;

        /**
        * Identifies the strokeColor dependency property.
        */
        public static strokeColorProperty: dependencyObservable.Property;

        /**
        * Identifies the textColor dependency property.
        */
        public static textColorProperty: dependencyObservable.Property;

        /**
        * Identifies the textSize dependency property.
        */
        public static textSizeProperty: dependencyObservable.Property;

        /**
        * Identifies the margin dependency property.
        */
        public static marginProperty: dependencyObservable.Property;

        /**
        * Identifies the textFormat dependency property.
        */
        public static textFormatProperty: dependencyObservable.Property;

        /**
        * Identifies the fontName dependency property.
        */
        public static fontNameProperty: dependencyObservable.Property;

        /**
        * Identifies the fontStyle dependency property.
        */
        public static fontStyleProperty: dependencyObservable.Property;

        /**
        * Gets or sets the color associated with label fill.
        */
        fillColor: string;

        /**
        * Gets or sets the color associated with the color of label stroke.
        */
        strokeColor: string;

        /**
        * Gets or sets the color of the label text.
        */
        textColor: string;

        /**
        * Gets or sets the size of the font of the label.
        */
        textSize: string;

        /**
        * Gets or sets the margin of label.
        */
        margin: string;

        /**
        * Gets or sets the format string of the label text. This format must comply to IEEE printf Specification : {@link http://pubs.opengroup.org/onlinepubs/009695399/functions/printf.html}
        */
        textFormat: string;

        /**
        * Gets or sets the name of font used for label text.
        */
        fontName: string;

        /**
        * Gets or sets the font style for label text. Possible values are: "Bold", "Italic", "BoldItalic", "Normal". The default value is "Normal"
        */
        fontStyle: string;
    }


    /**
     * Generic scheme for event arguments provided to handlers of events exposed
     * by a {@link RadCartesianChart} and {@link RadPieChart}.
     */
    export class ChartEventData implements observableModule.EventData {

        /**
        *Returns the name of the event that has been fired.
        */
        eventName: string;

        /**
        * The object that fires the event.
        */
        object: any;

        /**
        * Gets the index of the data point in the series to which the event relates.
        */
        pointIndex: number;

        /**
        * Gets the selected series to which the event relates.
        */
        series: any;

        /**
        * Native instance of point data class specific to the OS 
        */
        pointData: any;
    }

}
