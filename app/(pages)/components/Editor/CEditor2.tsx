import { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EditorJsTool } from "./Editorjstool";


interface Props {
    data:JSON,
    setData:any
}

export default function Editor({ data, setData }:Props) {
	const editorCore = useRef(null);
	const ReactEditorJS = createReactEditorJS();

	const handleInitialize = useCallback((instance:any) => {
		// await instance._editorJS.isReady;
		instance._editorJS.isReady
			.then(() => {
				// set reference to editor
				editorCore.current = instance;
			})
			.catch((err:any) => console.log("An error occured", err));
	}, []);

	const handleSave = useCallback(async () => {
		// retrieve data inserted
		const savedData = await editorCore.current.save();
		// save data
		setData(savedData);
	}, [setData]);

	return (
		<div className="editor-container">
			<h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
			<ReactEditorJS
				onInitialize={handleInitialize}
				tools={EditorJsTool}
				onChange={handleSave}
				defaultValue={data}
                
			/>
		</div>
	);
}
