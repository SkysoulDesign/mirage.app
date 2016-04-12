declare class TKChart {
    static new();
    static alloc();
    public legend: TKChartLegendView;
    public allowAnimations: boolean;
    public style: TKChartSeriesStyle;
    public gridStyle: TKChartGridStyle;

    public delegate: TKChartDelegate;

    public title: TKChartTitleView;
    public removeAllData();
    public removeSeries(series: TKChartSeries);
    public addSeries(series: TKChartSeries);
    public addAxis(axis: TKChartAxis): void;
    public addAnnotation(annotation: TKChartAnnotation);

    public selectionMode: TKChartSelectionMode;
    public autoresizingMask: any;
    public reloadData(): void;
    public update(): void;
}

declare class TKChartGridStyle {
    public static new();

    public verticalLineStroke: TKStroke;
    public verticalLineAlternateStroke: TKStroke;
    public verticalLinesHidden: boolean;
    public verticalFill: TKFill;
    public verticalAlternateFill: TKFill;

    public horizontalLineStroke: TKStroke;
    public horizontalLineAlternateStroke: TKStroke;
    public horizontalFill: TKFill;
    public horizontalAlternateFill: TKFill;
    public horizontalLinesHidden: boolean;
}

declare class TKChartAnnotation {
    public hidden: boolean;
    public zPosition: TKChartAnnotationZPosition;
}

declare class TKChartGridLineAnnotation extends TKChartAnnotation {
    public static new();
    public value: any;
    public axis: TKChartAxis;
    public style: TKChartGridLineAnnotationStyle;
}

declare class TKChartGridLineAnnotationStyle {
    public stroke: TKStroke;
}

declare class TKChartBandAnnotation extends TKChartAnnotation {
    public static new();
    public axis: TKChartAxis;
    public range: TKRange;
    public style: TKChartBandAnnotationStyle;
}

declare class TKChartBandAnnotationStyle {
    public stroke: TKStroke;
    public fill: TKFill;
}

declare class TKChartAxis {
    public style: TKChartAxisStyle;
    public labelFormat: string;
    public plotMode: TKChartAxisPlotMode;
    public allowZoom: boolean;
    public allowPan: boolean;
    public zoom: number;
}

declare class TKChartNumericAxis extends TKChartAxis {

    static alloc();
    static new();
    public initWithMinimumAndMaximum(min: number, max: number);

    public position: TKChartAxisPosition;

    public range: TKRange;
    public majorTickInterval: number;
}

declare class TKChartCategoryAxis extends TKChartAxis {
    static alloc();
    static new();
    public majorTickInterval: number;
    public minorTickInterval: number;
    public baseline: number;
    public offset: number;
}

declare class TKChartDateTimeAxis extends TKChartAxis {
    static alloc();
    static new();
    public majorTickInterval: number;
    public majorTickIntervalUnit: TKChartDateTimeAxisIntervalUnit;
    public minorTickIntervalUnit: TKChartDateTimeAxisIntervalUnit;
    public range: TKRange;
}

declare class TKChartAxisStyle {
    public lineStroke: TKStroke;
    public labelStyle: TKChartAxisLabelStyle

    public titleStyle: TKChartAxisTitleStyle;
    public majorTickStyle: TKChartAxisMajorTickStyle;
    public minorTickStyle: TKChartAxisTickStyle;
}

declare class TKChartStackInfo {
    public static alloc();
    public stackMode: TKChartStackMode;
}

declare class TKChartAxisLabelStyle {
    public textColor: UIColor;
    public textOffset: number;
    public font: UIFont;
}

declare class TKChartAxisTitleStyle {
}

declare class TKChartAxisTickStyle {
}

declare class TKChartAxisMajorTickStyle {
}

declare class TKChartSeries {
    static new();
    static alloc();
    public style: TKChartSeriesStyle;
    public xAxis: TKChartAxis;
    public yAxis: TKChartAxis;
    public tag: number;
    public index: number;
}

declare class TKChartPieSeries extends TKChartSeries {

    public initWithItems(items: NSArray): TKChartPieSeries;
    public initWithItemsReuseIdentifier(items: NSArray, reuseIdentifier: NSString): TKChartPieSeries;
    public initWithItemsForKeys(items: NSArray, keys: NSDictionary): TKChartPieSeries;
    public initWithItemsForKeysReuseIdentifier(items: NSArray, keys: NSDictionary, reuseIdentifier: NSString): TKChartPieSeries;
    public initWithItemsXValueKeyYValueKey(items: NSArray, xValueKey: NSString, yValueKey: NSString): TKChartPieSeries;

    public setItems(items: NSArray);

    public items: NSArray;
    public rotationEnabled: boolean;
    public expandRadius: number;
    public visibleInLegend: boolean;
    public selectionMode: TKChartSeriesSelectionMode;

    public labelDisplayMode: TKChartPieSeriesLabelDisplayMode;
}

declare class TKChartDonutSeries extends TKChartPieSeries {
}

declare class TKChartBarSeries extends TKChartSeries {
    public gapLength: number;
    public maxBarHeight: number;
    public minBarHeight: number;
    public allowClustering: boolean;
}

declare class TKChartColumnSeries extends TKChartSeries {
}

declare class TKChartLineSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartSplineSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartAreaSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartSplineAreaSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartOhlcSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartBubbleSeries extends TKChartSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
    public scale: number;
}

declare class TKChartScatterSeries extends TKChartSeries {
}

declare class TKChartCandlestickSeries extends TKChartOhlcSeries {
    public static alloc();
    public initWithItems(dataPoints: NSArray);
}

declare class TKChartTitleView {
    public text: string;
    public hidden: boolean;
}

declare class TKChartDataPoint {
    static new();
    static alloc();
    public initWithNameValue(name: string, value: any);
}

declare class TKChartBubbleDataPoint {
    static alloc();
    public static dataPointWithXYArea(x: number, y: number, area: number);
    public initWithXYArea(x: number, y: number, area: number);
}

declare class TKChartFinancialDataPoint {
    static alloc(): TKChartFinancialDataPoint;
    public static dataPointWithXOpenHighLowClose(x: any, open: number, close: number, high: number, low: number);
    public static dataPointWithXOpenHighLowCloseValue(xValue: any, open: number, high: number, low: number, close: number, volume: number);
}

declare class TKChartPointLabelStyle {
    public textHidden: boolean;
    public labelOffset: UIOffset;
    public font: any; UIFont;
    public textColor: UIColor;
    public fill: TKSolidFill;
    public stroke: TKStroke;
}

declare class TKChartSeriesStyle {
    public pointLabelStyle: TKChartPointLabelStyle;
    public palette: TKChartPalette;
    public shapePalette: TKChartPalette;
}

declare class TKChartLegendView {
    public static alloc();
    public static new();
    public hidden: boolean;
    public titleLabel: UILabel;
    public showTitle: boolean;
    public style: TKChartLegendStyle;
    public initWithChart(chart: TKChart);
    public update();
}

declare class TKChartLegendStyle {
    public position: TKChartLegendPosition;
}

declare class TKChartPalette {
    public static new();
    public addPaletteItem(item: TKChartPaletteItem)
}

declare class TKChartPaletteItem {
    public static new();
    static paletteItemWithStrokeAndFill(stroke: TKStroke, fill: TKFill): TKChartPaletteItem;

}

declare class TKFill {
}

declare class TKRange {
    public minimum: any;
    public maximum: any;
    static rangeWithMinimumAndMaximum(min: any, max: any);
}

declare class TKSolidFill {
    static new();
    public color: UIColor;
    public initWithColor(color: UIColor): any;
    static solidFillWithColor(color: UIColor): TKSolidFill;
}
declare class TKStroke {
    static new();
    public static strokeWithColor(color: any): TKStroke;
    public width: number;
    public fill: TKSolidFill;
    public dashPattern: NSArray;
    public color: UIColor;
}

declare enum TKChartSelectionMode {
    TKChartSelectionModeSingle,
    TKChartSelectionModeMultiple
}

declare enum TKChartSeriesSelectionMode {
    TKChartSeriesSelectionModeNone,
    TKChartSeriesSelectionModeSeries,
    TKChartSeriesSelectionModeDataPoint
}

declare enum TKChartPieSeriesLabelDisplayMode {
    TKChartPieSeriesLabelDisplayModeInside,
    TKChartPieSeriesLabelDisplayModeOutside,
}

declare enum TKChartLegendPosition {
    TKChartLegendPositionLeft,
    TKChartLegendPositionRight,
    TKChartLegendPositionTop,
    TKChartLegendPositionBottom,
    TKChartLegendPositionFloating
}

declare enum TKChartSeriesStylePaletteMode {
    TKChartSeriesStylePaletteModeUseSeriesIndex,
    TKChartSeriesStylePaletteModeUseItemIndex
}

declare enum TKChartAxisPosition {
    TKChartAxisPositionLeft,
    TKChartAxisPositionRight,
    TKChartAxisPositionTop,
    TKChartAxisPositionBottom,
}

declare enum TKChartAxisPlotMode {
    TKChartAxisPlotModeOnTicks,
    TKChartAxisPlotModeBetweenTicks
}

declare enum TKChartDateTimeAxisIntervalUnit {
    TKChartDateTimeAxisIntervalUnitSeconds,
    TKChartDateTimeAxisIntervalUnitMinutes,
    TKChartDateTimeAxisIntervalUnitHours,
    TKChartDateTimeAxisIntervalUnitDays,
    TKChartDateTimeAxisIntervalUnitWeeks,
    TKChartDateTimeAxisIntervalUnitMonths,
    TKChartDateTimeAxisIntervalUnitYears,
    TKChartDateTimeAxisIntervalUnitCustom

}

declare enum TKChartStackMode {
    TKChartStackModeStack,
    TKChartStackModeStack100
}

declare enum TKChartAnnotationZPosition {
    TKChartAnnotationZPositionBelowSeries,
    TKChartAnnotationZPositionAboveSeries
}

declare enum TKChartAxisLabelFitMode {
    TKChartAxisLabelFitModeNone,
    TKChartAxisLabelFitModeMultiline,
    TKChartAxisLabelFitModeRotate
}

interface TKChartData extends NSObject {
    //Returns a x-value in cartesian series.
    dataXValue: any;
    //Returns a y-value in cartesian series.
    dataYValue: any;
    //the name for a pie
    dataName: NSString;
    //the value of the bubble area for bubble series
    area: NSNumber;
    //open price value for financial series
    open: NSNumber;
    // High price value for financial series.
    high: NSNumber;
    // Low price value for financial series.
    low: NSNumber;
    // Close price value for financial series.
    close: NSNumber;
    // Volume value for financial series.
    volume: NSNumber;
    // The y axis value for indicator signal line
    signalYValue: any;
}

interface TKChartDelegate extends NSObject {

    chartDidSelectSeries(chart: TKChart, series: TKChartSeries): void;
    chartDidDeselectSeries(chart: TKChart, series: TKChartSeries): void;
    chartDidSelectPointInSeriesAtIndex(chart: TKChart, point: TKChartData, series: TKChartSeries, index: NSNumber): void;
    chartDidDeselectPointInSeriesAtIndex(chart: TKChart, point: TKChartData, series: TKChartSeries, index: NSNumber): void;

    //    chartWillZoom(chart: TKChart): void;
    chartDidZoom(chart: TKChart): void;
    //    chartWillPan(chart: TKChart): void;
    chartDidPan(chart: TKChart): void;

    // chartPaletteItemForSeriesAtIndex(chart: TKChart, series: TKChartSeries, index: NSNumber): TKChartPaletteItem;
    // chartPaletteItemForPointInSeries(chart: TKChart, index: NSNumber, series: TKChartSeries): TKChartPaletteItem;
    // chartShapeForSeriesAtIndex(chart: TKChart, series: TKChartSeries, index: NSNumber): TKChartPaletteItem;

    // - (void)chart:(TKChart * __nonnull)chart trackballDidTrackSelection:(NSArray* __nonnull)selection;
    // - (void)chart:(TKChart* __nonnull)chart trackballDidHideSelection:(NSArray * __nonnull)selection;
    //- chartAnimationForSeriesWithSatateInRect(chart : TKChart,  series: TKChartSeries ,state: TKChartSeriesRenderState, rect: CGRect ) : CAAnimation;
    //  chartLabelForDataPointPropertyInSeriesAtIndex(chart: TKChart,  dataPoint: TKChartData,propertyName: NSString, series: TKChartSeries,  dataIndex: NSNumber ) : TKChartPointLabel;
    //- (NSString * __nullable)chart:(TKChart * __nonnull)chart textForLabelAtPoint:(id<TKChartData> __nonnull)dataPoint property:(NSString * __nullable)propertyName inSeries:(TKChartSeries * __nonnull)series atIndex:(NSUInteger)dataIndex;
    //- (NSString * __nullable)chart:(TKChart * __nonnull )chart textForAxis:(TKChartAxis* __nonnull)axis value:(id __nullable)value atIndex:(NSUInteger)index;
    //- (NSAttributedString * __nullable)chart:(TKChart * __nonnull )chart attributedTextForAxis:(TKChartAxis * __nonnull)axis value:(id __nullable)value atIndex:(NSUInteger)index;
    //- (TKChartPointLabelRender * __nullable)chart:(TKChart * __nonnull)chart pointLabelRenderForSeries:(TKChartSeries * __nonnull)series withRender:(TKChartSeriesRender * __nonnull)render;
    //- (TKChartLegendItem * __nullable)chart:(TKChart * __nonnull)chart legendItemForSeries:(TKChartSeries * __nonnull)series atIndex:(NSUInteger)index;
    //- (void)chart:(TKChart * __nonnull)chart updateLegendItem:(TKChartLegendItem * __nonnull)item forSeries:(TKChartSeries * __nonnull )series atIndex:(NSUInteger)index;
    //- (void)chart:(TKChart* __nonnull)chart didTapOnLegendItem:(TKChartLegendItem* __nonnull)legendItem;
}