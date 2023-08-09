import React, { Component } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";

const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS", "LINK_BUTTONS", "HISTORY_BUTTONS"],
    INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD", className: "custom-css-class" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
        {
            label: "Strikethrough",
            style: "STRIKETHROUGH",
        },
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
        { label: "Blockquote", style: "blockquote" },
    ],
    LINK_BUTTONS: [
        { label: "Link", style: "LINK" },
        { label: "Remove Link", style: "REMOVE_LINK" },
    ],
};

export default class RichTextInput extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            value:
                props.value !== ""
                    ? RichTextEditor.createValueFromString(props.value, "html")
                    : RichTextEditor.createEmptyValue(),
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({
                value: RichTextEditor.createValueFromString(this.props.value, "html"),
            });
        }
    }
    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value.toString("html"));
        }
    };

    render() {
        const editorContainerStyle = {
            border: "1px solid #ccc",
            minHeight: "150px",
            padding: "10px",
        };
        const editorStyle = {
            minHeight: "150px",
        };
        return (
            <div style={editorContainerStyle}>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                    toolbarConfig={toolbarConfig}
                    editorStyle={editorStyle}
                />
            </div>
        );
    }
}
