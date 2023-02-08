import { create } from 'zustand';
import { calendarizeCourseEvents, calendarizeCustomEvents, calendarizeFinals, getSectionCodes } from '$lib/helpers';
import {
  AppStoreCourse,
  AppStoreDeletedCourse,
  CalendarEvent,
  CourseData,
  CourseEvent,
  RepeatingCustomEvent,
} from '../../types';

/**
 * shared schedule store interface
 * @remarks don't have to define parameter types in the function implementations; hover over them to see their types
 */
export interface ScheduleStore {
  currentScheduleIndex: number;
  customEvents: RepeatingCustomEvent[];
  addedCourses: AppStoreCourse[];
  addedSectionCodes: { [key: number]: Set<string> };
  deletedCourses: AppStoreDeletedCourse[];
  eventsInCalendar: CalendarEvent[];
  finalsEventsInCalendar: CourseEvent[];
  scheduleNames: string[];
  unsavedChanges: boolean;

  addCourse: (newCourse: AppStoreCourse) => void;
  addSection(newSection: AppStoreCourse): void;
  deleteCourse: (addedCourses: AppStoreCourse[], deletedCourses: AppStoreDeletedCourse[]) => void;
  editCustomEvent: (customEvents: RepeatingCustomEvent[]) => void;
  undoDelete: (deletedCourses: AppStoreDeletedCourse[]) => void;
  addCustomEvent: (newCustomEvent: RepeatingCustomEvent) => void;
  deleteCustomEvent: (customEvents: RepeatingCustomEvent[]) => void;
  changeCustomEventColor: (customEvents: RepeatingCustomEvent[], customEventId: number, color: string) => void;
  saveSchedule: () => void;
  addSchedule: (scheduleNames: string[]) => void;
  renameSchedule: (scheduleNames: string[]) => void;
  copySchedule: (addedCourses: AppStoreCourse[], customEvents: RepeatingCustomEvent[]) => void;
  loadSchedule: (userData: CourseData) => void;
  clearSchedule: (addedCourses: AppStoreCourse[], customEvents: RepeatingCustomEvent[]) => void;
  deleteSchedule: (
    scheduleNames: string[],
    addedCourses: AppStoreCourse[],
    customEvents: RepeatingCustomEvent[],
    currentScheduleIndex: number
  ) => void;
  changeCourseColor: (addedCourses: AppStoreCourse[], sectionCode: string, color: string) => void;
}

/**
 * hook to use the shared schedule store
 */
export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  currentScheduleIndex: 0,
  customEvents: [],
  addedCourses: [],
  addedSectionCodes: { 0: new Set() },
  deletedCourses: [],
  eventsInCalendar: [],
  finalsEventsInCalendar: [],
  unsavedChanges: false,
  scheduleNames: ['Schedule 1'],

  addCourse(newCourse) {
    const currentStoreValues = get();

    const currentAddedCourses = currentStoreValues.addedCourses;
    const currentCustomEvents = currentStoreValues.customEvents;

    const addedCourses = [...currentAddedCourses, newCourse];

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(currentCustomEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const finalsEventsInCalendar = calendarizeFinals(addedCourses);

    const unsavedChanges = true;

    set(() => ({
      addedCourses,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  addSection(newSection) {
    const currentStoreValues = get();

    const addedCourses = currentStoreValues.addedCourses.map((course) =>
      course.section.sectionCode === newSection.section.sectionCode ? newSection : course
    );

    const currentScheduleNames = currentStoreValues.scheduleNames;
    const currentCustomEvents = currentStoreValues.customEvents;

    const addedSectionCodes = getSectionCodes(addedCourses, currentScheduleNames);

    const finalsEventsInCalendar = calendarizeFinals(addedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(currentCustomEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      addedCourses,
      addedSectionCodes,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  deleteCourse(addedCourses, deletedCourses) {
    const currentStoreValues = get();

    const currentScheduleNames = currentStoreValues.scheduleNames;
    const currentCustomEvents = currentStoreValues.customEvents;

    const addedSectionCodes = getSectionCodes(addedCourses, currentScheduleNames);

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(currentCustomEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const finalsEventsInCalendar = calendarizeFinals(addedCourses);
    const unsavedChanges = true;

    set(() => ({
      addedCourses,
      addedSectionCodes,
      deletedCourses,
      finalsEventsInCalendar,
      eventsInCalendar,
      unsavedChanges,
    }));
  },

  undoDelete(deletedCourses) {
    set(() => ({
      deletedCourses,
      unsavedChanges: true,
    }));
  },

  addCustomEvent(customEvent) {
    const currentStoreValues = get();

    const currentCustomEvents = currentStoreValues.customEvents;
    const currentAddedCourses = currentStoreValues.addedCourses;

    const customEvents = [...currentCustomEvents, customEvent];
    const finalsEventsInCalendar = calendarizeFinals(currentAddedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(currentAddedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      customEvents,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  editCustomEvent(customEvents) {
    const currentStoreValues = get();
    const currentAddedCourses = currentStoreValues.addedCourses;

    const finalsEventsInCalendar = calendarizeFinals(currentAddedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(currentAddedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      customEvents,
      finalsEventsInCalendar,
      eventsInCalendar,
      unsavedChanges,
    }));
  },

  deleteCustomEvent(customEvents) {
    const currentStoreValues = get();

    const currentAddedCourses = currentStoreValues.addedCourses;

    const finalsEventsInCalendar = calendarizeFinals(currentAddedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(currentAddedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      customEvents,
      finalsEventsInCalendar,
      unsavedChanges,
      eventsInCalendar,
    }));
  },

  changeCustomEventColor(customEvents, customEventId, color) {
    const currentStoreValues = get();

    const currentAddedCourses = currentStoreValues.addedCourses;

    const finalsEventsInCalendar = calendarizeFinals(currentAddedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(currentAddedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    // TODO: change color
    console.log({ color, customEventId }, 'please implement me!');

    set(() => ({
      customEvents,
      eventsInCalendar,
      unsavedChanges,
      finalsEventsInCalendar,
    }));
  },

  saveSchedule() {
    set(() => ({
      unsavedChanges: false,
    }));
  },

  /**
   * If the user adds a schedule:
   * 1) update the array of schedule names,
   * 2) add another key/value pair to keep track of the section codes for that schedule,
   * 3) redirect the user to the new schedule
   */
  addSchedule(scheduleNames) {
    const currentSectionCodes = get().addedSectionCodes;
    const currentScheduleIndex = scheduleNames.length - 1;
    const addedSectionCodes = currentSectionCodes;
    addedSectionCodes[scheduleNames.length - 1] = new Set();

    set(() => ({
      currentScheduleIndex,
      scheduleNames,
      addedSectionCodes,
    }));
  },

  renameSchedule(scheduleNames) {
    set(() => ({
      scheduleNames,
    }));
  },

  copySchedule(addedCourses, customEvents) {
    const currentStoreValues = get();

    const currentScheduleNames = currentStoreValues.scheduleNames;

    const addedSectionCodes = getSectionCodes(addedCourses, currentScheduleNames);
    const finalsEventsInCalendar = calendarizeFinals(addedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      customEvents,
      addedSectionCodes,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  loadSchedule(userData) {
    const addedCourses = userData.addedCourses;
    const scheduleNames = userData.scheduleNames;
    const customEvents = userData.customEvents;
    const addedSectionCodes = getSectionCodes(addedCourses, scheduleNames);
    const finalsEventsInCalendar = calendarizeFinals(addedCourses);
    const eventsInCalendar = [...calendarizeCourseEvents(addedCourses), ...calendarizeCustomEvents(customEvents)];
    const unsavedChanges = false;

    set(() => ({
      addedCourses,
      addedSectionCodes,
      customEvents,
      scheduleNames,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  clearSchedule(addedCourses, customEvents) {
    const currentStoreValues = get();
    const currentScheduleNames = currentStoreValues.scheduleNames;

    const addedSectionCodes = getSectionCodes(addedCourses, currentScheduleNames);
    const finalsEventsInCalendar = calendarizeFinals(addedCourses);

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(customEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    const unsavedChanges = true;

    set(() => ({
      addedCourses,
      customEvents,
      addedSectionCodes,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },

  deleteSchedule(scheduleNames, addedCourses, customEvents, currentScheduleIndex) {
    const addedSectionCodes = getSectionCodes(addedCourses, scheduleNames);
    const finalsEventsInCalendar = calendarizeFinals(addedCourses);
    const eventsInCalendar = [...calendarizeCourseEvents(addedCourses), ...calendarizeCustomEvents(customEvents)];

    set(() => ({
      addedCourses,
      customEvents,
      addedSectionCodes,
      scheduleNames,
      currentScheduleIndex,
      eventsInCalendar,
      finalsEventsInCalendar,
    }));
  },

  changeCourseColor(addedCoursesAfterColorChange, sectionCode, color) {
    const currentStoreValues = get();
    const currentScheduleNames = currentStoreValues.scheduleNames;
    const currentCustomEvents = currentStoreValues.customEvents;

    const addedCourses = addedCoursesAfterColorChange;
    const finalsEventsInCalendar = calendarizeFinals(addedCourses);
    const unsavedChanges = true;

    const addedSectionCodes = getSectionCodes(addedCourses, currentScheduleNames);
    addedSectionCodes[sectionCode] = new Set();

    const calendarCourseEvents = calendarizeCourseEvents(addedCourses);
    const calendarCustomEvents = calendarizeCustomEvents(currentCustomEvents);
    const eventsInCalendar = [...calendarCourseEvents, ...calendarCustomEvents];

    // TODO: change the color
    console.log(color, 'please implement change color');

    set(() => ({
      addedCourses,
      addedSectionCodes,
      eventsInCalendar,
      finalsEventsInCalendar,
      unsavedChanges,
    }));
  },
}));