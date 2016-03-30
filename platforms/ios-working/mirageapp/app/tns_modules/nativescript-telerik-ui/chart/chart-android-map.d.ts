declare module com {
    module telerik {
        module android {
            module common {
                interface Function {
                    apply(arg: any): any
                }
                class ObservableCollection<E> extends java.util.ArrayList<E>{

                }
            }
        }
        module widget {
            module primitives {
                module legend {
                    class RadLegendView extends android.view.View {
                        constructor(context: any);
                        setLegendProvider(value: any);
                        setLayoutParams(value: any);
                        setId(value: any);
                        getId();
                    }
                }
            }
            module palettes {
                class ChartPalettes {
                    static light(): ChartPalette;
                }
                class ChartPalette {
                    seriesEntries(): any;
                    getEntry(family: string): PaletteEntry;
                }

                class PaletteEntry {
                    setStroke(value: any);
                    getStroke(): any;
                    setFill(value: any);
                    getFill(): number;
                    setStrokeWidth(value: any);
                    getStrokeWidth(): number;
                    setCustomValue(keyName: string, value: string);
                    getCustomValue(keyName: string, defValue?: string): string;

                }
                class PaletteEntryCollection {
                    setFamily(value: string);
                    add(value: PaletteEntry);
                }
            }
            module chart {
                module engine {
                    module series {
                        module combination {
                            enum ChartSeriesCombineMode {
                                NONE,
                                CLUSTER,
                                STACK,
                                STACK_100
                            }
                        }
                    }
                    module dataPoints{
                        class DataPoint { //extends ChartNode
                            index():number;
                        }
                    }
                    module axes {
                        module common {
                            enum AxisHorizontalLocation {
                                LEFT, RIGHT
                            }
                            enum AxisVerticalLocation {
                                TOP, BOTTOM
                            }
                            enum AxisPlotMode {
                                ON_TICKS, BETWEEN_TICKS
                            }
                            enum DateTimeComponent {
                                SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR
                            }
                            enum AxisLabelFitMode {
                                MULTI_LINE, NONE, ROTATE
                            }
                        }
                    }

                    module databinding {
                        class GenericDataPointBinding {
                            constructor(binding: com.telerik.android.common.Function);
                        }
                    }
                    module chartAreas {
                        class AngleRange {
                            constructor(startAngle: number, sweepAngle: number);
                        }
                    }
                }

                module visualization {
                    module behaviors {
                        class ChartPanZoomMode {
                            public static NONE: number;
                            public static HORIZONTAL: number;
                            public static VERTICAL: number;
                            public static BOTH: number;
                        }
                        enum ChartSelectionMode {
                            NONE, SINGLE, MULTIPLE
                        }
                        class ChartBehavior{

                        }
                        class ChartPanAndZoomBehavior extends ChartBehavior{
                           public setPanMode(mode: number);
                           public getPanMode():number;
                           public setZoomMode(mode: number);
                           public getZoomMode(): number;
                           public addPanZoomListener(listener: com.telerik.widget.chart.visualization.behaviors.PanZoomListener);
                        }
                        class ChartSelectionBehavior extends ChartBehavior{
                           public setSelectionChangeListener(listener: com.telerik.widget.chart.visualization.behaviors.ChartSelectionChangeListener);
                           public setSeriesSelectionMode(mode: ChartSelectionMode);
                           public getSeriesSelectionMode():ChartSelectionMode;
                           public setDataPointsSelectionMode(mode: ChartSelectionMode);
                           public getDataPointsSelectionMode(): ChartSelectionMode;
                        }
                        class ChartBehaviorCollection extends com.telerik.android.common.ObservableCollection<ChartBehavior> {
                            add(behavior: ChartBehavior);
                        }
                        class ChartSelectionContext {
                            public selectionBehavior(): ChartSelectionBehavior;
                            public previousSelection(): ChartSelectionContext;
                            public selectedDataPoint(): com.telerik.widget.chart.engine.dataPoints.DataPoint;
                            public deselectedDataPoint(): com.telerik.widget.chart.engine.dataPoints.DataPoint;
                            public selectedSeries(): common.ChartSeries;
                            public deselectedSeries(): common.ChartSeries;
                        }
                        interface IChartSelectionChangeListener{
                            onSelectionChanged(selectionContext: ChartSelectionContext );
                        }
                        class ChartSelectionChangeListener{
                            constructor(impl: any);
                        }
                        interface IPanZoomListener {
                            onPan(panX: number, panY: number): void;
                            onZoom(zoomX: number, zoomY: number): void;
                        }
                        class PanZoomListener {
                            constructor(impl: any);
                        }
                    }
                    module common {
                        module renderers {
                            class ChartLabelRenderer {
                            }
                        }

                        class CartesianAxis {
                            setPlotMode(mode: any);
                            getPlotMode(): any;
                            setLabelSize(size: number);
                            setLabelMajorTickInterval(interval: number);
                            setVerticalLocation(location: any);
                            setHorizontalLocation(location: any);
                            setLineThickness(thickness: number);
                            setLineColor(color: any);
                            setLabelTextColor(color: any);
                            setLabelMargin(margin: any);
                            setLabelFormat(format: string);
                            setCanApplyPalette(value: boolean);
                            setLabelFitMode(value: com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode);
                            setLabelRotationAngle(value: number);
                        }

                        class ChartSeries {
                            constructor();
                            setData(data: any);
                            setLegendTitle(title: string);
                            setValueBinding(binding: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                            getCollectionIndex() : number;
                            public static SERIES_Z_INDEX :number;
                        }

                        class CartesianSeries {

                        }
                    }

                    module cartesianChart {
                        enum GridLineVisibility {
                            X,
                            Y,
                            XY,
                            NONE
                        }
                        module axes {
                            class LogarithmicAxis extends LinearAxis {
                                getExponentStep(): number;
                                setExponentStep(value: number);

                                getLogarithmBase(): number;
                                setLogarithmBase(value: number);
                            }

                            class LinearAxis extends common.CartesianAxis {
                                getGapLength(): number;
                                setGapLength(value: any);
                                setMajorStep(value: number);
                                getMajorStep(): number;
                                setMajorTickInterval(value: any);
                                setMinimum(value: any);
                                setMaximum(value: any);
                                getMinimum(): number;
                                getMaximum(): number;
                            }

                            class CategoricalAxis extends common.CartesianAxis {
                                constructor();
                                setMajorStep(value: number);
                                getMajorStep(): number;
                            }

                            class DateTimeCategoricalAxis extends CategoricalAxis {
                                setDateTimeComponent(value: any);
                            }

                            class DateTimeContinuousAxis extends LinearAxis {
                                constructor();
                            }
                        }

                        module series {
                            module scatter {
                                class ScatterPointSeries extends com.telerik.widget.chart.visualization.common.CartesianSeries {
                                    setXValueBinding(dpb: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                    setYValueBinding(dpb: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                }

                                class ScatterBubbleSeries extends ScatterPointSeries {
                                    setBubbleScale(value: number);
                                    setBubbleSizeBinding(binding: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                }
                            }
                            module categorical {

                                class OhlcSeries extends CategoricalSeries {
                                    setHighBinding(value: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                    setLowBinding(value: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                    setOpenBinding(value: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                    setCloseBinding(value: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                }

                                class CandlestickSeries extends OhlcSeries {
                                    constructor();
                                }

                                class CartesianSeries extends common.ChartSeries {
                                    setHorizontalAxis(value: com.telerik.widget.chart.visualization.common.CartesianAxis);
                                    setVerticalAxis(value: com.telerik.widget.chart.visualization.common.CartesianAxis);
                                }

                                class CategoricalSeries extends CartesianSeries {
                                    setCategoryBinding(binding: com.telerik.widget.chart.engine.databinding.GenericDataPointBinding);
                                    setCombineMode(value: com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode) : void;
                                }

                                class LineSeries extends CategoricalSeries {
                                    constructor();
                                }

                                class BarSeries extends CategoricalSeries {
                                    constructor();

                                }

                                class SplineSeries extends LineSeries {
                                    constructor();

                                }

                                class SplineAreaSeries extends AreaSeries {

                                }

                                class AreaSeries extends CategoricalSeries {

                                }

                                class BubbleSeries extends CategoricalSeries {
                                    setBubbleScale(scale: number);
                                    getBubbleScale(): number;
                                    setBubbleSizeBinding(value: any);
                                }
                            }
                        }

                        class CartesianChartGrid {
                            constructor();
                            setMajorLinesVisibility(value: any);
                            setStripLinesVisibility(value: any);
                            setLineColor(value: any);
                            setLineThickness(value: any);
                            getYStripeBrushes(): any;
                            getXStripeBrushes(): any;
                            setCanApplyPalette(value: boolean);
                        }

                        class RadCartesianChartView extends android.view.View {
                            constructor(context: any);
                            getSeries(): any;
                            setPalette(value: any);
                            getPalette(): any;
                            setHorizontalAxis(value: com.telerik.widget.chart.visualization.common.CartesianAxis);
                            setVerticalAxis(value: com.telerik.widget.chart.visualization.common.CartesianAxis);
                            setGrid(value: com.telerik.widget.chart.visualization.cartesianChart.CartesianChartGrid);
                            getId(): any;
                            setId(value: any);
                            setLayoutParams(value: any);
                            getBehaviors() :  com.telerik.widget.chart.visualization.behaviors.ChartBehaviorCollection;
                            setZoom(width:number, height:number):void;
                        }
                    }

                    module pieChart {
                        class RadPieChartView {
                            constructor(context: any);
                            setPalette(value: any);
                            getPalette(): any;
                            setSeries(series: PieSeries);
                            getSeries(): any;
                            removeBehavior(behavour: com.telerik.widget.chart.visualization.behaviors.ChartBehavior);
                            getBehaviors(): com.telerik.widget.chart.visualization.behaviors.ChartBehaviorCollection;
                        }

                        class PieSeries extends common.ChartSeries {
                            constructor();
                            setRadiusFactor(factor:number);
                            setSelectedPointOffset(factor:number);
                            setAngleRange(range: com.telerik.widget.chart.engine.chartAreas.AngleRange)
                        }

                        class DoughnutSeries extends PieSeries {
                            constructor();
                            setInnerRadiusFactor(innerRadius: number);
                        }
                    }
                    module annotations {
                        module cartesian {
                            class CartesianChartAnnotation {
                                getAxis(): com.telerik.widget.chart.visualization.common.CartesianAxis;
                                setAxis(axis: com.telerik.widget.chart.visualization.common.CartesianAxis);
                                getZIndex(): number;
                                setZIndex(value: number);
                                setCanApplyPalette(value: boolean);
                                setVisible(visibility: boolean);
                            }
                            class CartesianStrokedAnnotation extends CartesianChartAnnotation {
                                getStrokeColor(): number;
                                setStrokeColor(value: number);
                                getStrokeWidth(): number;
                                setStrokeWidth(value: number);
                                getStrokeEffect(): android.graphics.PathEffect;
                                setStrokeEffect(value: android.graphics.PathEffect);
                            }
                            class CartesianGridLineAnnotation extends CartesianStrokedAnnotation {
                                constructor(axis: com.telerik.widget.chart.visualization.common.CartesianAxis, value: any);
                                getValue(): any;
                                setValue(value: any);
                            }
                            class CartesianPlotBandAnnotation extends CartesianStrokedAnnotation {
                                constructor(axis: com.telerik.widget.chart.visualization.common.CartesianAxis, from: any, to: any);
                                getFrom(): any;
                                setFrom(value: any);
                                getTo(): any;
                                setTo(value: any);
                                getFillColor(): number;
                                setFillColor(value: number);
                            }
                        }
                    }
                }
            }
        }
    }
}
