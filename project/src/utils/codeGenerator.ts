import { GeneratedCode } from '../types';

interface CodeElement {
  type: string;
  props: Record<string, any>;
  styles?: Record<string, string>;
  children?: string;
}

interface CodeState {
  elements: CodeElement[];
  styles: Record<string, Record<string, string>>;
  scripts: string[];
}

let currentState: CodeState = {
  elements: [],
  styles: {},
  scripts: []
};

export function generateCode(input: string, previousCode: GeneratedCode): { code: GeneratedCode; response: string } {
  // Parse the input to understand if it's a new request or modification
  const isModification = previousCode.html && (
    input.toLowerCase().includes('change') ||
    input.toLowerCase().includes('modify') ||
    input.toLowerCase().includes('update') ||
    input.toLowerCase().includes('make')
  );

  if (isModification) {
    return handleModification(input, previousCode);
  } else {
    return handleNewRequest(input);
  }
}

function handleNewRequest(input: string): { code: GeneratedCode; response: string } {
  // Reset current state
  currentState = { elements: [], styles: {}, scripts: [] };

  // Parse input for form elements
  if (input.toLowerCase().includes('contact form')) {
    currentState.elements = [
      {
        type: 'form',
        props: { class: 'contact-form', onsubmit: 'handleSubmit(event)' },
        children: '',
      },
      {
        type: 'input',
        props: {
          type: 'text',
          name: 'name',
          id: 'name',
          class: 'form-input',
          placeholder: 'Enter your name',
          required: true
        }
      },
      {
        type: 'input',
        props: {
          type: 'tel',
          name: 'phone',
          id: 'phone',
          class: 'form-input phone-input',
          placeholder: 'Enter your phone',
          required: true
        }
      },
      {
        type: 'textarea',
        props: {
          name: 'message',
          id: 'message',
          class: 'form-textarea',
          placeholder: 'Your message',
          rows: '4',
          required: true
        }
      },
      {
        type: 'button',
        props: {
          type: 'submit',
          class: 'submit-button'
        },
        children: 'Send Message'
      }
    ];

    // Add styles
    currentState.styles = {
      '.contact-form': {
        'display': 'flex',
        'flex-direction': 'column',
        'gap': '1.5rem',
        'max-width': '500px',
        'margin': '2rem auto',
        'padding': '2rem',
        'background': 'white',
        'border-radius': '1rem',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      '.form-input, .form-textarea': {
        'width': '100%',
        'padding': '0.75rem',
        'border': '2px solid #e2e8f0',
        'border-radius': '0.5rem',
        'font-size': '1rem',
        'transition': 'border-color 0.2s ease'
      },
      '.phone-input': {
        'background': 'white'
      },
      '.form-input:focus, .form-textarea:focus': {
        'outline': 'none',
        'border-color': '#3b82f6',
        'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.1)'
      },
      '.submit-button': {
        'background': '#3b82f6',
        'color': 'white',
        'padding': '0.75rem 1.5rem',
        'border': 'none',
        'border-radius': '0.5rem',
        'font-weight': '600',
        'cursor': 'pointer',
        'transition': 'transform 0.2s ease, background-color 0.2s ease'
      },
      '.submit-button:hover': {
        'background': '#2563eb',
        'transform': 'translateY(-1px)'
      }
    };

    // Add JavaScript
    currentState.scripts = [
      `function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data);
        // Add your form submission logic here
        alert('Form submitted successfully!');
        event.target.reset();
      }`
    ];
  }

  return {
    code: generateCodeFromState(),
    response: 'I\'ve created a beautiful contact form with all the requested fields. The form includes:\n- Name input\n- Phone input\n- Message textarea\n- Submit button\n\nThe form has modern styling, animations, and basic form handling. You can modify any part of it by asking!'
  };
}

function handleModification(input: string, previousCode: GeneratedCode): { code: GeneratedCode; response: string } {
  // Parse the HTML to rebuild the current state
  parseExistingCode(previousCode);

  const input_lower = input.toLowerCase();

  // Handle color modifications
  const colorMatch = input_lower.match(/change\s+(?:the\s+)?(?:background|bg|color)\s+(?:of\s+)?(\w+)\s+(?:to\s+)?(\w+)/i);
  if (colorMatch) {
    const [, element, color] = colorMatch;
    const elementClass = element.includes('phone') ? '.phone-input' : 
                        element.includes('name') ? '.form-input' :
                        element.includes('message') ? '.form-textarea' :
                        element.includes('button') ? '.submit-button' : null;

    if (elementClass && currentState.styles[elementClass]) {
      if (input_lower.includes('background') || input_lower.includes('bg')) {
        currentState.styles[elementClass]['background'] = color;
      } else {
        currentState.styles[elementClass]['color'] = color;
      }
    }
  }

  // Handle size modifications
  if (input_lower.includes('larger') || input_lower.includes('bigger')) {
    if (input_lower.includes('button')) {
      currentState.styles['.submit-button'] = {
        ...currentState.styles['.submit-button'],
        'padding': '1rem 2rem',
        'font-size': '1.125rem'
      };
    }
  }

  return {
    code: generateCodeFromState(),
    response: `I've updated the styling as requested. The changes have been applied successfully. You can continue to modify any other aspects of the form!`
  };
}

function parseExistingCode(previousCode: GeneratedCode): void {
  // Keep the current state if it exists, otherwise create a new one
  if (!currentState.elements.length) {
    // This is a basic form structure that we'll maintain
    currentState = {
      elements: [
        {
          type: 'form',
          props: { class: 'contact-form', onsubmit: 'handleSubmit(event)' },
          children: '',
        },
        {
          type: 'input',
          props: {
            type: 'text',
            name: 'name',
            id: 'name',
            class: 'form-input',
            placeholder: 'Enter your name',
            required: true
          }
        },
        {
          type: 'input',
          props: {
            type: 'tel',
            name: 'phone',
            id: 'phone',
            class: 'form-input phone-input',
            placeholder: 'Enter your phone',
            required: true
          }
        },
        {
          type: 'textarea',
          props: {
            name: 'message',
            id: 'message',
            class: 'form-textarea',
            placeholder: 'Your message',
            rows: '4',
            required: true
          }
        },
        {
          type: 'button',
          props: {
            type: 'submit',
            class: 'submit-button'
          },
          children: 'Send Message'
        }
      ],
      styles: {
        '.contact-form': {
          'display': 'flex',
          'flex-direction': 'column',
          'gap': '1.5rem',
          'max-width': '500px',
          'margin': '2rem auto',
          'padding': '2rem',
          'background': 'white',
          'border-radius': '1rem',
          'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        '.form-input, .form-textarea': {
          'width': '100%',
          'padding': '0.75rem',
          'border': '2px solid #e2e8f0',
          'border-radius': '0.5rem',
          'font-size': '1rem',
          'transition': 'border-color 0.2s ease'
        },
        '.phone-input': {
          'background': 'white'
        },
        '.form-input:focus, .form-textarea:focus': {
          'outline': 'none',
          'border-color': '#3b82f6',
          'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        '.submit-button': {
          'background': '#3b82f6',
          'color': 'white',
          'padding': '0.75rem 1.5rem',
          'border': 'none',
          'border-radius': '0.5rem',
          'font-weight': '600',
          'cursor': 'pointer',
          'transition': 'transform 0.2s ease, background-color 0.2s ease'
        },
        '.submit-button:hover': {
          'background': '#2563eb',
          'transform': 'translateY(-1px)'
        }
      },
      scripts: [
        `function handleSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData.entries());
          console.log('Form submitted:', data);
          // Add your form submission logic here
          alert('Form submitted successfully!');
          event.target.reset();
        }`
      ]
    };
  }
}

function generateCodeFromState(): GeneratedCode {
  // Generate HTML
  const html = generateHTML();
  
  // Generate CSS
  const css = generateCSS();
  
  // Generate JavaScript
  const js = currentState.scripts.join('\n\n');

  return { html, css, js };
}

function generateHTML(): string {
  return currentState.elements.map(element => {
    const props = Object.entries(element.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    if (element.type === 'input' || element.type === 'img') {
      return `<${element.type} ${props}>`;
    }

    return `<${element.type} ${props}>${element.children || ''}</${element.type}>`;
  }).join('\n');
}

function generateCSS(): string {
  return Object.entries(currentState.styles)
    .map(([selector, styles]) => {
      const styleRules = Object.entries(styles)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join('\n');
      return `${selector} {\n${styleRules}\n}`;
    })
    .join('\n\n');
}