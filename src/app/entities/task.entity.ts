export class TaskEntity {
    ID: string = '';
    ProjectID: string = '';
    description: string = '';
    completedAt: string = null;

    constructor(values = {}) {
        Object.keys(this).forEach(key => {
            if (values && values.hasOwnProperty(key)) {
                this[key] = values[key];
            }
        });
    }
}