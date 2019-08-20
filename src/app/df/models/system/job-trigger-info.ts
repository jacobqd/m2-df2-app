export class JobTriggerInfo {
  triggerType: string;
  jobKey: string;
  triggerName: string;
  triggerGroup: string;
  cronExpression;
  startTime: string;
  endTime: string;
  priority: number;
  triggerState: string;
  prevFireTime: string;
  nextFireTime: string;
  finalFireTime: string;
  misfireInstructions: string;
  repeatCount: number;
  repeatInterval: number;
  timesTriggered: number;
}
