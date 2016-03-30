declare module com {
    module telerik {
        module widget {
            module calendar {
				module RadCalendarView{
					interface OnCellClickListener {
						onCellClick(cell: CalendarCell);
					}
					
					class OnCellClickListener{
						constructor(impl: OnCellClickListener);
					}
					
					interface OnDisplayDateChangedListener{
						onDisplayDateChanged(oldDate: number, newDate: number);
					}
					
					class OnDisplayDateChangedListener{
						constructor(impl: OnDisplayDateChangedListener);
					}
					
					interface OnDisplayModeChangedListener{
						onDisplayModeChanged(oldValue: CalendarDisplayMode, newValue: CalendarDisplayMode);
					}
					
					class OnDisplayModeChangedListener{
						constructor(impl: OnDisplayModeChangedListener);
					}
					
					interface OnSelectedDatesChangedListener{
						onSelectedDatesChanged(context: SelectionContext);
					}
					
					class OnSelectedDatesChangedListener{
						constructor(impl: OnSelectedDatesChangedListener);
					}
					
					class SelectionContext{
						constructor();
						datesAdded() : java.util.List<number>;
						datesRemoved() : java.util.List<number>;
						oldSelection() : java.util.List<number>;
						newSelection() : java.util.List<number>;
					}
				}
				
				class CalendarCell {
					getDate() : number;
					setDate(value: number);
					
				}
				
           		class RadCalendarView {
					   constructor(any);
					   setSelectionMode(mode : CalendarSelectionMode) : void;
					   getSelectionMode() : CalendarSelectionMode;
					   setDisplayMode(mode : CalendarDisplayMode) : void;
					   getDisplayMode() : CalendarDisplayMode;
					   
					   setDisplayDate(date : number);
					   getDisplayDate() : number;
					   
					   setSelectedDates(dates : java.util.List<number>);
					   getSelectedDates() :java.util.List<number>;
					   
					   getSelectedRange() : DateRange;
					   setSelectedRange(value : DateRange);
					   
					   setMaxDate(date : number);
					   getMaxDate() : number;
					   
					   setMinDate(date : number);
					   getMinDate() : number;
					   
					   setYearModeCompact(value: boolean);
					   isYearModeCompact() : boolean;
					   
					   getEventAdapter() : events.EventAdapter;
					   shiftDate(forward : boolean) : void;
					   invalidate() : void;
					   
					   setOnCellClickListener(listener: RadCalendarView.OnCellClickListener);
					   setOnDisplayDateChangedListener(listener: RadCalendarView.OnDisplayDateChangedListener);
					   setOnDisplayModeChangedListener(listener: RadCalendarView.OnDisplayModeChangedListener);
					   setOnSelectedDatesChangedListener(listener: RadCalendarView.OnSelectedDatesChangedListener);
					   
					   getOnCellClickListener(): RadCalendarView.OnCellClickListener;
				}
				   
				module events {
					class EventAdapter{
						constructor(any);
						setEvents(any);
						getEvents() : java.util.List<telerik.widget.calendar.events.Event>;
						getEventsForDate(date : number) : java.util.List<telerik.widget.calendar.events.Event>;
					}
					
					class Event{
						getStartDate() : number;
						setStartDate(value : number);
						
						getEndDate() : number;
						setEndDate(value : number);
						
						getTitle() : string;
						setTitle(value : string);
						
						isAllDay() : boolean;
						setIsAllDay(value : boolean);
						
						getEventColor() : number;
						setEventColor(value: number);
						
						constructor(title : string, start : number, end : number);
					}
				}
				   
                enum CalendarDisplayMode{
					Month, 
					Week,
					Year
				}
				
				enum CalendarSelectionMode {
					None,
					Single,
					Multiple,
					Range
				}
				
				class DateRange{
					constructor(start : number, end : number);
					
					getStart() : number;
					setStart(value : number);
					
					getEnd() : number;
					setEnd(value : number);
				} 
            }
        }
    }
}

declare module java{
	module lang{
		class Long{
			
		}
	}
	
	module util{
		class Calendar{
			constructor();
			static getInstance() : Calendar;
			set(property : number, value : number);
			set(property : number) : number;	
			setTimeInMillis(value : number);
			getTimeInMillis() : number;
			static MONTH : number;		
		}
		
		class List<T>{
			constructor();
			Add(item : T);
			size() : number;
			get(index : number) : T;
		}
	}
}