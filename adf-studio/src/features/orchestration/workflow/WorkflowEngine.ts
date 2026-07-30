import type {
  WorkflowDefinition,
  WorkflowExecutionPlan,
  WorkflowInstance,
  WorkflowState,
  WorkflowTemplate,
} from "@/features/orchestration/types";

/** Presentation helpers — workflow lifecycle model only (no execution). */

export class WorkflowDefinitionView {
  constructor(public readonly definition: WorkflowDefinition) {}

  get stageCount(): number {
    return this.definition.stageKinds.length;
  }
}

export class WorkflowTemplateView {
  constructor(public readonly template: WorkflowTemplate) {}
}

export class WorkflowStateView {
  static label(state: WorkflowState): string {
    return state;
  }

  static isTerminal(state: WorkflowState): boolean {
    return state === "completed" || state === "cancelled";
  }
}

export class WorkflowExecutionPlanView {
  constructor(public readonly plan: WorkflowExecutionPlan) {}

  get isExecutable(): false {
    return this.plan.executable;
  }
}

export class WorkflowInstanceView {
  constructor(public readonly instance: WorkflowInstance) {}

  get isActive(): boolean {
    return this.instance.state === "active" || this.instance.state === "planned";
  }
}

export class WorkflowManager {
  constructor(
    private definitions: WorkflowDefinition[],
    private instances: WorkflowInstance[],
    private templates: WorkflowTemplate[],
    private plans: WorkflowExecutionPlan[],
  ) {}

  listDefinitions(): WorkflowDefinition[] {
    return [...this.definitions];
  }

  listInstances(): WorkflowInstance[] {
    return [...this.instances];
  }

  listTemplates(): WorkflowTemplate[] {
    return [...this.templates];
  }

  planFor(workflowId: string): WorkflowExecutionPlan | undefined {
    return this.plans.find((p) => p.workflowId === workflowId);
  }

  byState(state: WorkflowState): WorkflowInstance[] {
    return this.instances.filter((i) => i.state === state);
  }
}
