/**
 * functions that manage schedules in the schedule store
 */

import { useScheduleStore } from '.';
import { addCourse, addCourseToAllSchedules } from './course';

/**
 * set the schedule index of the store
 */
export function setScheduleIndex(scheduleIndex: number) {
  useScheduleStore.setState({ scheduleIndex });
}

/**
 * add a new schedule to the store
 * @param scheduleName name of the new schedule
 */
export function addSchedule(scheduleName: string) {
  const { schedules, addUndoState } = useScheduleStore.getState();
  addUndoState();
  useScheduleStore.setState({
    schedules: [...schedules, { scheduleName, courses: [], customEvents: [] }],
    scheduleIndex: schedules.length - 1,
  });
}

/**
 * rename a schedule
 * @param newScheduleName new name of the schedule
 * @param scheduleIndex index of the schedule
 */
export function renameSchedule(newScheduleName: string, scheduleIndex: number) {
  const { addUndoState, schedules } = useScheduleStore.getState();
  addUndoState();
  schedules[scheduleIndex].scheduleName = newScheduleName;
  useScheduleStore.setState({ schedules });
}

/**
 * clear all events on the current schedule
 */
export function clearCurrentSchedule() {
  const { addUndoState, schedules, scheduleIndex } = useScheduleStore.getState();
  addUndoState();
  schedules[scheduleIndex].courses = [];
  schedules[scheduleIndex].customEvents = [];
  useScheduleStore.setState({ schedules });
}

/**
 * remove the current schedule from the schedules array
 */
export function deleteCurrentSchedule() {
  const { addUndoState, schedules, scheduleIndex } = useScheduleStore.getState();
  addUndoState();
  schedules.splice(scheduleIndex, 1);
  useScheduleStore.setState({ schedules, scheduleIndex: Math.min(scheduleIndex, schedules.length - 1) });
}

/**
 * copy the current schedule to another schedule
 * @param to index of the other schedule
 */
export function copySchedule(to: number) {
  const { addUndoState, schedules, scheduleIndex } = useScheduleStore.getState();
  addUndoState();
  for (const course of schedules[scheduleIndex].courses) {
    if (to === schedules.length) {
      addCourseToAllSchedules(course);
    } else {
      addCourse(course, to, false);
    }
  }
}