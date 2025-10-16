# ConsentToggle

A reusable consent toggle component with clear states for granting or withdrawing consent for specific processing purposes.

## Features

- ✅ Clear visual states (granted/withdrawn)
- ✅ Accessible with ARIA labels and keyboard navigation
- ✅ Callback functions for `onGrant` and `onWithdraw`
- ✅ Purpose-specific labels and optional descriptions
- ✅ Dark theme support
- ✅ Responsive design
- ✅ Disabled state support

## Usage

```jsx
import { ConsentToggle } from '@gomoku/components';

function MyApp() {
  const handleGrant = (payload) => {
    console.log('Consent granted:', payload);
    // { purposeId: 'analytics', value: true }
  };

  const handleWithdraw = (payload) => {
    console.log('Consent withdrawn:', payload);
    // { purposeId: 'analytics', value: false }
  };

  return (
    <ConsentToggle
      purposeId="analytics"
      label="Analytics Cookies"
      description="Allow us to collect anonymous usage data to improve our service."
      initialValue={false}
      onGrant={handleGrant}
      onWithdraw={handleWithdraw}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `purposeId` | `string` | ✅ | - | Unique identifier for the consent purpose |
| `label` | `string` | ✅ | - | Label for the consent toggle |
| `description` | `string` | ❌ | - | Optional description text |
| `initialValue` | `boolean` | ❌ | `false` | Initial consent state |
| `onGrant` | `function` | ✅ | - | Callback when consent is granted |
| `onWithdraw` | `function` | ✅ | - | Callback when consent is withdrawn |
| `disabled` | `boolean` | ❌ | `false` | Whether the toggle is disabled |
| `className` | `string` | ❌ | `''` | Additional CSS classes |

## Accessibility

The component follows WCAG guidelines:

- **Keyboard Navigation**: Use Tab to focus, Space or Enter to toggle
- **Screen Reader Support**: Uses `aria-pressed` and descriptive labels
- **Focus Indicators**: Clear visual focus states
- **Semantic HTML**: Proper button and label associations

## Callback Payload

Both `onGrant` and `onWithdraw` receive a payload object:

```javascript
{
  purposeId: string, // The purposeId prop value
  value: boolean     // true for granted, false for withdrawn
}
```

## Examples

### Basic Usage
```jsx
<ConsentToggle
  purposeId="marketing"
  label="Marketing Cookies"
  onGrant={(payload) => saveConsent(payload)}
  onWithdraw={(payload) => removeConsent(payload)}
/>
```

### With Description
```jsx
<ConsentToggle
  purposeId="analytics"
  label="Analytics"
  description="Help us understand how you use our website"
  initialValue={true}
  onGrant={handleGrant}
  onWithdraw={handleWithdraw}
/>
```

### Disabled State
```jsx
<ConsentToggle
  purposeId="necessary"
  label="Necessary Cookies"
  description="Required for basic functionality"
  initialValue={true}
  disabled={true}
  onGrant={handleGrant}
  onWithdraw={handleWithdraw}
/>
```

## Styling

The component uses CSS modules. You can override styles by passing a `className` prop or by targeting the component's CSS classes in your global styles.

## Storybook

View all examples and interact with the component in Storybook:
- Basic states (Granted/Withdrawn)
- With/without description
- Disabled state
- Dark theme
- Multiple toggles
- Accessibility showcase