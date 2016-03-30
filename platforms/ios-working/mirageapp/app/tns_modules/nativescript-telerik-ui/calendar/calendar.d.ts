/**
 * The Calendar module defines all types needed to setup a RadCalendar control.
 */
declare module "calendar" {
	import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    import observable = require("data/observable");
	
	/**
	 * Defines the possible values for the {@link viewMode} property 
	 * for the relevant {@link RadCalendar} instance.
	 */
	export enum CalendarViewMode{
		/**
		 * {@link RadCalendar} will display a single week.
		 */
		Week,
		
		/**
		 * RadCalendar will display one month.
		 */
   		Month,
		   
		/**
		 * RadCalendar will display a list of month names.
		 */
   		MonthNames,
		   
		/**
		 * RadCalendar will display a whole year.
		 */
   		Year
	}
	
	/**
	 * Defines the possible values for the {@link selectionMode} property
	 * for the relevant {@link RadCalendar} instance.
	 */
	export enum CalendarSelectionMode{
		/**
		 * When {@link RadCalendar} is in None selection mode, 
		 * no date can be selected.
		 */
		None, 
		
		/**
		 * When {@link RadCalendar} is in Single selection mode, 
		 * only one date can be selected at a time.
		 */
		Single,
		
		/**
		 * When {@link RadCalendar} is in Multiple selection mode, 
		 * the selected dates can be more than one at the same time.
		 */
		Multiple,
		
		/**
		 * When {@link RadCalendar} is in Range selection mode, 
		 * the selected dates can be more than one as long as they form a range of consecutive dates.
		 */
		Range
	}
	
	/**
	 * Instance of this class is exposed by the {@link selectedDateRange} property
	 * of {@link RadCalendar}.
	 */
	export class DateRange{
		/***
		 * Indicates the first date of the range.
		 */
		startDate: Date;
		
		/**
		 * Indicates the last date of the range.
		 */
		endDate: Date;
	}
	
	/** 
	 * Represents the event used by the {@link eventSource} property 
	 * of {@link RadCalendar}.
	 */
	export class CalendarEvent{
		/**
		 * Indicates the title of the event. 
		 */
		title : string;
		
		/**
		 * Indicates the start date of the event.
		 */
		startDate : Date;
		
		/**
		 * Indicates the end date of the event.
		 */
		endDate : Date;
		
		/**
		 * Indicates whether the event is an all day event.
		 */
		isAllDay: boolean;
	}
	
	export class CalendarViewModeChangedEventData implements observable.EventData {
		/**
		*Returns the name of the event that has been fired.
		*/
		eventName: string;
		
		/**
		* The object that fires the event.
		*/
		object: any;
		
		/**
		* The old value of the ViewMode property.
		*/
		oldValue: string;    
		
		/**
		* The new value of the ViewMode property.
		*/
		newValue: string;
	}
	
	export class CalendarSelectionEventData implements observable.EventData {
		/**
		*Returns the name of the event that has been fired.
		*/
		eventName: string;
		
		/**
		* The object that fires the event.
		*/
		object: any;
		
		/**
		* The relative Date.
		*/
		date: Date;
	}
	
	export class CalendarSelectingEventData implements observable.EventData {
		/**
		*Returns the name of the event that has been fired.
		*/
		eventName: string;
		
		/**
		* The object that fires the event.
		*/
		object: any;
		
		/**
		* The relative Date.
		*/
		date: Date;
		
		/**
		* Indicates whether the event should be canceled if possible.
		*/
		returnValue: boolean;
	}
	
	export class CalendarNavigationEventData implements observable.EventData {
		/**
		*Returns the name of the event that has been fired.
		*/
		eventName: string;
		
		/**
		* The object that fires the event.
		*/
		object: any;
	
		/**
		* The relative Date.
		*/
		date: Date;
	}
	
	/**
	 * This class represents the RadCalendar component. RadCalendar is based on the 
	 * already familiar native Android and iOS components from Telerik UI for Android 
	 * and Telerik UI for iOS. The component exposes all major features supported
	 * by the native controls through a unified API suitable for NativeScript developers.
	 */
	export class RadCalendar extends view.View{
		/**
		 * This event is fired when a date is selected.
         * The event exposes an instance of the {@link CalendarSelectionEventData} class.
		 */
		public static dateSelectedEvent : string;
		
		/**
		 * This event is fired when a date is deselected.
         * The event exposes an instance of the {@link CalendarSelectionEventData} class.
		 */
		public static dateDeselectedEvent : string;
		
		/**
		 * This event is fired when {@link RadCalendar} has navigated to a certain date.
		 * The event exposes an instance of the {@link CalendarNavigationEventData} class.
		 */
		public static navigatedToDateEvent : string;
		
		/**
		 * This event is fired when {@link RadCalendar} is about to navigate to a certain date.
		 * The event exposes an instance of the {@link CalendarNavigationEventData} class.
		 */
		public static navigatingToDateStartedEvent : string;
		
		/**
		 * This event is fired when {@link RadCalendar}'s {@link viewMode} has been changed.
		 * The event exposes an instance of the {@link CalendarViewModeChangedEventData} class.
		 */
		public static viewModeChangedEvent : string;
		
		/**
		 * Represents the native RadCalendarView form Telerik UI for Android.
		 */
		android: any;
		
		/**
		 * Represents the native TKCalendar from Telerik UI for iOS.
		 */
		ios: any
		
		/**
		 * Identifies the {@link minDate} dependency property.
		 */
		minDateProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the min date accessible by the (@link RadCalendar) instance.
		 */
		minDate: Date;
		
		/**
		 * Identifies the {@link maxDate} dependency property.
		 */
		maxDateProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the max date accessible by the (@link RadCalendar) instance.
		 */
		maxDate: Date;
		
		/**
		 * Identifies the {@link selectedDate} dependency property.
		 */
		selectedDateProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current selected date in the {@link RadCalendar} instance.
		 */
		selectedDate: Date;
		
		/**
		 * Identifies the {@link selectedDates} dependency property.
		 */
		selectedDatesProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current selected dates in the {@link RadCalendar} instance.
		 */
		selectedDates: Array<Date>;
		
		/**
		 * Identifies the {@link selectedDateRange} dependency property.
		 */
		selectedDateRangeProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current selected date range in the {@link RadCalendar} instance.
		 */
		selectedDateRange: DateRange;
		
		/**
		 * Identifies the {@link viewMode} dependency property.
		 */
		viewModeProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current view mode in the {@link RadCalendar} instance.
		 */
		viewMode: CalendarViewMode;
		
		/**
		 * Identifies the {@link selectionMode} dependency property.
		 */
		selectionModeProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current selection mode in the {@link RadCalendar} instance.
		 */
		selectionMode: CalendarSelectionMode;
		
		/**
		 * Identifies the {@link displayedDate} dependency property.
		 */
		displayedDateProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current displayed date in the {@link RadCalendar} instance.
		 */
		displayedDate: Date;
		
		/**
		 * Identifies the {@link eventSource} dependency property.
		 */
		eventSourceProperty: dependencyObservable.Property;
		
		/**
		 * Gets or sets the current event source in the {@link RadCalendar} instance.
		 */
		eventSource: Array<CalendarEvent>;
		
		/**
		 * Reloads all events in the {@link RadCalendar} instance and resets the selection.
		 */
		reload();
		
		/**
		 * Navigates to the next screen in current view mode context.
		 */
		navigateForward();
		
		/**
		 * Navigates to the previous screen in the current view mode context.
		 */
		navigateBack();
		
		/**
		 * Navigates to the specified date.
		 */
		goToDate(date: Date);
		
		/**
		 * Returns the events for a specific date.
		 */
		getEventsForDate(date: Date) : Array<CalendarEvent>;
	}
}