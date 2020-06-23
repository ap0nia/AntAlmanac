import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import {
    calendarizeCourseEvents,
    calendarizeCustomEvents,
    calendarizeFinals,
} from './calenderizeHelpers';

class AppStore extends EventEmitter {
    constructor() {
        super();

        // Get cached user Settings
        let evalDestination, darkMode = null;
        if (typeof Storage !== 'undefined') {
            evalDestination = window.localStorage.getItem('InstructorEvals');
            darkMode = window.localStorage.getItem('DarkMode')
        }

        this.currentScheduleIndex = 0;
        this.customEvents = [];
        this.addedCourses = [];
        this.deletedCourses = [];
        this.snackbarMessage = '';
        this.snackbarVariant = 'info';
        this.snackbarDuration = 3000;
        this.snackbarPosition = { vertical: 'bottom', horizontal: 'left'};
        this.eventsInCalendar = [];
        this.finalsEventsInCalendar = [];

        this.darkMode = (darkMode === null) ? false : darkMode === "true";

        this.evalDestination = (evalDestination === null) ? 'eatereval' : evalDestination;
    }

    getCurrentScheduleIndex() {
        return this.currentScheduleIndex;
    }

    getAddedCourses() {
        return this.addedCourses;
    }

    getCustomEvents() {
        return this.customEvents;
    }

    getEventsInCalendar() {
        return this.eventsInCalendar;
    }

    getFinalEventsInCalendar() {
        return this.finalsEventsInCalendar;
    }

    getDeletedCourses() {
        return this.deletedCourses;
    }

    getSnackbarMessage() {
        return this.snackbarMessage;
    }

    getSnackbarVariant() {
        return this.snackbarVariant;
    }

    getSnackbarPosition() {
        return this.snackbarPosition;
    }

    getSnackbarDuration() {
        return this.snackbarDuration;
    }

    getDarkMode() {
        return this.darkMode;
    }

    getEvalDestination() {
        return this.evalDestination;
    }

    handleActions(action) {
        switch (action.type) {
            case 'ADD_COURSE':
                this.addedCourses = this.addedCourses.concat(action.newCourse);
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                break;
            case 'ADD_SECTION':
                this.addedCourses = this.addedCourses.map((course) => {
                    if (
                        course.section.sectionCode ===
                        action.newSection.section.sectionCode
                    )
                        return action.newSection;
                    else return course;
                });
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                break;
            case 'DELETE_COURSE':
                this.addedCourses = action.addedCoursesAfterDelete;
                this.deletedCourses = action.deletedCourses;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                break;
            case 'CHANGE_CURRENT_SCHEDULE':
                this.currentScheduleIndex = action.newScheduleIndex;
                this.emit('currentScheduleIndexChange');
                break;
            case 'UNDO_DELETE':
                this.deletedCourses = action.deletedCourses;
                break;
            case 'CLEAR_SCHEDULE':
                this.addedCourses = action.addedCoursesAfterClear;
                this.customEvents = action.customEventsAfterClear;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                this.emit('customEventsChange');
                break;
            case 'ADD_CUSTOM_EVENT':
                this.customEvents = this.customEvents.concat(
                    action.customEvent
                );
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('customEventsChange');
                break;
            case 'DELETE_CUSTOM_EVENT':
                this.customEvents = action.customEventsAfterDelete;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('customEventsChange');
                break;
            case 'COURSE_COLOR_CHANGE':
                this.addedCourses = action.addedCoursesAfterColorChange;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                break;
            case 'CUSTOM_EVENT_COLOR_CHANGE':
                this.customEvents = action.customEventsAfterColorChange;
                this.emit('customEventsChange');
                break;
            case 'LOAD_SCHEDULE':
                this.addedCourses = action.userData.addedCourses;
                this.customEvents = action.userData.customEvents;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                this.emit('customEventsChange');
                break;
            case 'OPEN_SNACKBAR':
                this.snackbarVariant = action.variant;
                this.snackbarMessage = action.message;
                this.snackbarDuration = action.duration ? action.duration : this.snackbarDuration;
                this.snackbarPosition = action.position ? action.position : this.snackbarPosition;
                this.emit('openSnackbar');
                break;
            case 'EDIT_CUSTOM_EVENTS':
                this.customEvents = action.customEventsAfterEdit;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('customEventsChange');
                break;
            case 'COPY_SCHEDULE':
                this.addedCourses = action.addedCoursesAfterCopy;
                this.customEvents = action.customEventsAfterCopy;
                this.finalsEventsInCalendar = calendarizeFinals();
                this.eventsInCalendar = calendarizeCourseEvents().concat(
                    calendarizeCustomEvents()
                );
                this.emit('addedCoursesChange');
                this.emit('customEventsChange');
                break;
            case 'TOGGLE_DARK_MODE':
                this.darkMode = action.darkMode;
                this.emit('darkModeToggle');
                window.localStorage.setItem('DarkMode', action.darkMode);
                break;
            case 'TOGGLE_EVALS':
                this.evalDestination = action.evalDestination;
                this.emit('evalsToggle');
                window.localStorage.setItem('InstructorEvals', action.evalDestination);
                break;
        }
    }
}

const store = new AppStore();
dispatcher.register(store.handleActions.bind(store));
export default store;