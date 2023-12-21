import { uuidv4 } from './utils';

export const initialBoards = [
  {
    name: 'Platform Launch',
    id: uuidv4(),
    columns: [
      {
        name: 'Todo',
        id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            title: 'Build UI for onboarding flow',
            description: '',
            status: 'Todo',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Sign up page',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Sign in page',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Welcome page',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Build UI for search',
            description: '',
            status: 'Todo',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Search page',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Build settings UI',
            description: '',
            status: 'Todo',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Account page',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Billing page',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'QA and test all major user journeys',
            description:
              'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
            status: 'Todo',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Internal testing',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'External testing',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: 'Doing',
        id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            title: 'Design settings and search pages',
            description: '',
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Settings - Account page',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Settings - Billing page',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Search page',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Add account management endpoints',
            description: '',
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Upgrade plan',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Cancel plan',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Update payment method',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Design onboarding flow',
            description: '',
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Sign up page',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Sign in page',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Welcome page',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Add search enpoints',
            description: '',
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Add search endpoint',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Define search filters',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Add authentication endpoints',
            description: '',
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Define user model',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Add auth endpoints',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title:
              'Research pricing points of various competitors and trial different business models',
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: 'Doing',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Research competitor pricing and business models',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Outline a business model that works for our solution',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title:
                  'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: 'Done',
        id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            title: 'Conduct 5 wireframe tests',
            description:
              'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Complete 5 wireframe prototype tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Create wireframe prototype',
            description:
              'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Create clickable wireframe prototype in Balsamiq',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Review results of usability tests and iterate',
            description:
              "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title:
                  'Meet to review notes from previous tests and plan changes',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Make changes to paper prototypes',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Conduct 5 usability tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title:
              'Create paper prototypes and conduct 10 usability tests with potential customers',
            description: '',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Create paper prototypes for version one',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Complete 10 usability tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Market discovery',
            description:
              'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Interview 10 prospective customers',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Competitor analysis',
            description: '',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Find direct and indirect competitors',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'SWOT analysis for each competitor',
                isCompleted: true,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Research the market',
            description:
              'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'Done',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Write up research analysis',
                isCompleted: true,
              },
              {
                id: uuidv4(),
                title: 'Calculate TAM',
                isCompleted: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Marketing Plan',
    id: uuidv4(),
    columns: [
      {
        name: 'Todo',
        id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            title: 'Plan Product Hunt launch',
            description: '',
            status: 'Todo',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Find hunter',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Gather assets',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Draft product page',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Notify customers',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Notify network',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Launch!',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Share on Show HN',
            description: '',
            status: '',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Draft out HN post',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Get feedback and refine',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Publish post',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Write launch article to publish on multiple channels',
            description: '',
            status: '',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Write article',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Publish on LinkedIn',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Publish on Inndie Hackers',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Publish on Medium',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: 'Doing',
        id: uuidv4(),
        tasks: [],
      },
      {
        name: 'Done',
        id: uuidv4(),
        tasks: [],
      },
    ],
  },
  {
    name: 'Roadmap',
    id: uuidv4(),
    columns: [
      {
        name: 'Now',
        id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            title: 'Launch version one',
            description: '',
            status: '',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Launch privately to our waitlist',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Launch publicly on PH, HN, etc.',
                isCompleted: false,
              },
            ],
          },
          {
            id: uuidv4(),
            title: 'Review early feedback and plan next steps for roadmap',
            description:
              "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
            status: '',
            subtasks: [
              {
                id: uuidv4(),
                title: 'Interview 10 customers',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Review common customer pain points and suggestions',
                isCompleted: false,
              },
              {
                id: uuidv4(),
                title: 'Outline next steps for our roadmap',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: 'Next',
        id: uuidv4(),
        tasks: [],
      },
      {
        name: 'Later',
        id: uuidv4(),
        tasks: [],
      },
    ],
  },
];

export const emptyBoard = {
  name: '',
  id: '',
  columns: [],
};

export const emptyColumn = {
  name: '',
  id: '',
  tasks: [],
};

export const emptyTask = {
  id: '',
  title: '',
  description: '',
  status: '',
  subtasks: [],
};

export const emptySubtask = {
  id: '',
  title: '',
  isCompleted: false,
};
