////////////////////////////////////////////////
//native api declarations
declare class NSObject {
    static new() : NSObject;
}

declare class NSDate{
	static new() : NSDate; 
	static dateWithTimeIntervalSince1970(seconds : number) : NSDate;
	timeIntervalSince1970 : number;
}

declare class NSLocale{
	static new() : NSLocale;
}

declare class TKCalendar{
	delegate : any;
	displayedDate : NSDate;
	dataSource : any;
	locale : NSLocale;
	maxDate : NSDate;
	minDate : NSDate;
	selectedDate : NSDate;
	selectedDates : NSArray;
	selectedDatesRange : TKDateRange;
	selectionMode : TKCalendarSelectionMode;
	viewMode : TKCalendarViewMode;
	
	eventsForDate(date : NSDate) : NSArray;
	navigateBack(animated : boolean) : void;
	navigateForwards(animated : boolean) : void;
	navigateToDate(date : NSDate, animated : boolean) : void;
	reloadData() : void;
	
	alloc() : any;
}

declare enum TKCalendarViewMode{
	TKCalendarViewModeWeek,
   	TKCalendarViewModeMonth,
   	TKCalendarViewModeMonthNames,
   	TKCalendarViewModeYear,
   	TKCalendarViewModeYearNumbers,
   	TKCalendarViewModeFlow
}

declare enum TKCalendarSelectionMode{
	TKCalendarSelectionModeNone,
   	TKCalendarSelectionModeSingle,
   	TKCalendarSelectionModeMultiple,
   	TKCalendarSelectionModeRange
}

declare class TKCalendarDelegate{
	static new() : TKCalendarDelegate;
	calendarDidChangedViewModeFromTo(calendar: TKCalendar, previousViewMode: TKCalendarViewMode, viewMode: TKCalendarViewMode) : void;
	calendarDidDeselectedDate(calendar: TKCalendar, date: NSDate) : void;
	calendarDidNavigateToDate(calendar: TKCalendar, date: NSDate) : void;
	calendarDidSelectDate(calendar: TKCalendar, date: NSDate) : void;
	// calendarShapeForEvent(calendar: TKCalendar, event: any) : TKShape;
	calendarShouldSelectDate(calendar: TKCalendar, date: NSDate) : boolean;
	// calendarUpdateVisualsForCell(calendar: TKCalendar, cell: TKCalendarCell) : void;
	// calendarViewForCellOfKind(calendar: TKCalendar, cellType: TKCalendarCellType) : TKCalendarCell;
	calendarWillNavigateToDate(calendar: TKCalendar, date: NSDate);
}

declare class TKCalendarDataSource{
	public calendarEventsForDate(calendar : TKCalendar, date : NSDate) : NSArray;
	public calendarEventsFromDateToDateWithCallback(calendar : TKCalendar, fromDate : NSDate, toDate : NSDate, callback: void) : NSArray;	
}

declare class TKDateRange{
	static initWithStartEnd(start : NSDate, end: NSDate) : TKDateRange;
}

declare class TKCalendarEvent {
	allDay : boolean;
	startDate : NSDate;
	endDate : NSDate;
	title : string;
	content : string;
	eventColor : UIColor;
	location : string;
	static new() : TKCalendarEvent;
}

////////////////////////////////////