import IssueInterface from './issue.interface'
export let IssuesData: Array<IssueInterface> = [
    {
        id: 1,
        title: 'Issue 1',
        discreption: 'Discreption ',
        assignee: 'User ',
        status: 'To do'
    },{
        id: 2,
        title: 'Issue 2',
        discreption: 'Discreption 2',
        assignee: 'User 2',
        status: 'In progress'
    },{
        id: 3,
        title: 'Issue 3',
        discreption: 'Discreption ',
        assignee: 'User ',
        status: 'In QA'
    },{
        id: 4,
        title: 'Issue 4',
        discreption: 'Discreption ',
        assignee: 'User ',
        status: 'Done'
    }
];


export const issueTypes: any = [
    {
        divId: 'to-do',
        title: 'To do'
    },{
        divId:'in-progress',
        title: 'In progress'
    },{
        divId:'in-qa',
        title: 'In QA'
    },{
        divId:'done',
        title: 'Done'
    }
]