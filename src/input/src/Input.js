import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Input extends PureComponent {
  static propTypes = {
    /**
     * Defines "autocomplete" html attribute [on/off]
     * @type {string}
     * @default 'on'
     */
    autocomplete: PropTypes.string,

    /**
     * Defines which classes this input field should have
     * @type {string}
     */
    classes: PropTypes.string,

    /**
     * Defines if while exposed state, the related field shall be editable
     * It only works combined with isTogglePassword
     * @type {boolean}
     */
    editableWhileVisible: PropTypes.bool,

    /**
     * Defines the index of the field
     * @type {number}
     */
    fieldIndex: PropTypes.number,

    /**
     * Defines the internal value that controls the related field logic visibility
     * @type {boolean}
     * @default false
     */
    initialShow: PropTypes.bool,

    /**
     * Defines if this field has a behavior to hide and show the value
     * @type {boolean}
     * @default false
     */
    isTogglePassword: PropTypes.bool,

    /**
     * Defines the maximum length for this field.
     * @type {number}
     */
    maxLength: PropTypes.number,

    /**
     * Defines the function name to 'oninput' event
     * @type {function}
     */
    onInput: PropTypes.func,

    /**
     * Defines "name" html attribute
     * @type {string}
     */
    name: PropTypes.string,

    /**
     * Defines "placeholder" html attribute
     * @type {string}
     */
    placeholder: PropTypes.string,

    /**
     * Defines "readonly" html attribute
     * @type {boolean}
     */
    readonly: PropTypes.bool,

    /**
     * Defines which row this field belongs to
     * @type {number}
     */
    rowIndex: PropTypes.number,

    /**
     * @type {string}
     * @default 'text'
     */
    type: PropTypes.string,

    /**
     * Defines the current value
     * @type {string}
     */
    value: PropTypes.string
  }

  static defaultProps = {
    autocomplete: 'on',
    type: 'text',
    isTogglePassword: false,
    initialShow: false,
    editableWhileVisible: false,
    readonly: false
  }

  constructor(props) {
    super(props)

    this.state = {
      isShowing: this.props.initialShow,
      readonly: this.props.readonly
    }

    if (this.props.editableWhileVisible) {
      if (!this.props.value || (this.props.value && this.props.value === '')) {
        this.state.isShowing = true
        this.state.readonly = true
      } else {
        this.state.readonly = !this.state.isShowing
      }
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({ ...this.state, ...{ isShowing: !this.state.isShowing } })

    if (this.props.editableWhileVisible) {
      this.setState({ ...this.state, ...{ readonly: !this.state.isShowing } })
    }
  }

  render() {
    const {
      autocomplete,
      classes,
      fieldIndex,
      initialShow,
      isTogglePassword,
      maxLength,
      name,
      onInput,
      placeholder,
      rowIndex,
      type,
      value,
      ...props
    } = this.props

    const inputType = isTogglePassword
      ? this.state.isShowing
        ? 'text'
        : 'password'
      : type

    return (
      <div>
        <input
          type={inputType}
          className={classes}
          autoComplete={autocomplete}
          data-field-index={fieldIndex}
          maxLength={maxLength}
          name={name}
          data-oninput={onInput}
          placeholder={placeholder}
          readOnly={this.state.readonly}
          data-row-index={rowIndex}
          defaultValue={value}
        />
        {isTogglePassword ? this.togglePassword() : ''}
      </div>
    )
  }

  togglePassword() {
    return (
      <button
        className={'btn btn-sm btn-primary'}
        type={'button'}
        onClick={this.handleToggle}
      >
        <span
          className={this.state.isShowing ? 'icon-12-eye-off' : 'icon-12-eye'}
        />
        <div className={'btn-tooltip'}>
          {this.state.isShowing ? 'Hide' : 'Show'}
        </div>
      </button>
    )
  }
}
