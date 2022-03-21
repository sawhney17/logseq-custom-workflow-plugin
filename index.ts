import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';


let logseqSettings = logseq.settings
async function toggleState(SeparatedArray, e) {
  let block = await logseq.Editor.getBlock(e.uuid)
  if (block != undefined) {
    let blockFirstWord = block.content.split(' ')[0].split('\n')[0]
    let commaSeparatedArray = SeparatedArray.split(", ")
    var insertionTracker = false
    for (const x in commaSeparatedArray) {
      if (commaSeparatedArray[x] == (blockFirstWord)) {
        let index = commaSeparatedArray.indexOf(commaSeparatedArray[x])
        let finalText;
        if (commaSeparatedArray[index + 1] == undefined) {
          finalText = " "
          insertionTracker = true
        }
        else {
          finalText = commaSeparatedArray[index + 1]
          insertionTracker = true
        }
        logseq.Editor.updateBlock(e.uuid, finalText + block.content.replace(blockFirstWord, ''))
        break
      }
    }
    if (insertionTracker == false) {
      logseq.Editor.updateBlock(block.uuid, commaSeparatedArray[0] + " " + block.content)
    }
  }
  else {
    logseq.App.showMsg("Error: You can't toggle state outside of a block")
  }
}
let settings: SettingSchemaDesc[] = [
  {
    key: "CommaSeparatedOptions",
    type: "string",
    title: "Options for Workflow 1",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: "TODO, DONE, CANCELLED, WAITING"
  },
  {
    key: "Keyboard-Shortcut",
    type: "string",
    title: "keyboard shortcut for Workflow 1",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: "mod+shift+enter"
  },
  {
    key: "CommaSeparatedOptions2",
    type: "string",
    title: "Options for Workflow 2",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: ""
  },
  {
    key: "Keyboard-Shortcut2",
    type: "string",
    title: "keyboard shortcut for Workflow 2",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "CommaSeparatedOptions3",
    type: "string",
    title: "Options for Workflow 3",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: ""
  },
  {
    key: "Keyboard-Shortcut3",
    type: "string",
    title: "keyboard shortcut for Workflow 3",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "CommaSeparatedOptions4",
    type: "string",
    title: "Options for Workflow 4",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: ""
  },
  {
    key: "Keyboard-Shortcut4",
    type: "string",
    title: "keyboard shortcut for Workflow 4",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "CommaSeparatedOptions5",
    type: "string",
    title: "Options for Workflow 5",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: ""
  },
  {
    key: "Keyboard-Shortcut5",
    type: "string",
    title: "keyboard shortcut for Workflow 5",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
]
logseq.useSettingsSchema(settings)
const main = async () => {

  function updateSettings() {
    logseqSettings = logseq.settings
  }
  logseq.onSettingsChanged(updateSettings)
  if (logseq.settings["Keyboard-Shortcut"] != "" && logseq.settings["CommaSeparatedOptions"] != "") {
    logseq.App.registerCommandPalette({
      key: 'Toggle-Workflow-State',
      label: 'Toggle Workflow State',
      keybinding: {
        binding: (logseq.settings["Keyboard-Shortcut"])
      }
    }, async (e) => {
      toggleState(logseqSettings["CommaSeparatedOptions"], e)
    })
  };
  if (logseq.settings["Keyboard-Shortcut2"] != "" && logseq.settings["CommaSeparatedOptions2"] != "") {
    logseq.App.registerCommandPalette({
      key: 'Toggle-Workflow-State2',
      label: 'Toggle Workflow State2',
      keybinding: {
        binding: (logseq.settings["Keyboard-Shortcut2"])
      }
    }, async (e) => {
      toggleState(logseqSettings["CommaSeparatedOptions2"], e)
    });
  }
  if (logseq.settings["Keyboard-Shortcut3"] != "" && logseq.settings["CommaSeparatedOptions3"] != "") {
    logseq.App.registerCommandPalette({
      key: 'Toggle-Workflow-State3',
      label: 'Toggle Workflow State3',
      keybinding: {
        binding: (logseq.settings["Keyboard-Shortcut3"])
      }
    }, async (e) => {
      toggleState(logseqSettings["CommaSeparatedOptions3"], e)
    });
  }
  if (logseq.settings["Keyboard-Shortcut4"] != "" && logseq.settings["CommaSeparatedOptions4"] != "") {
    logseq.App.registerCommandPalette({
      key: 'Toggle-Workflow-State4',
      label: 'Toggle Workflow State4',
      keybinding: {
        binding: (logseq.settings["Keyboard-Shortcut4"])
      }
    }, async (e) => {
      toggleState(logseqSettings["CommaSeparatedOptions4"], e)
    });
  }
  if (logseq.settings["Keyboard-Shortcut5"] != "" && logseq.settings["CommaSeparatedOptions5"] != "") {
    logseq.App.registerCommandPalette({
      key: 'Toggle-Workflow-State5',
      label: 'Toggle Workflow State5',
      keybinding: {
        binding: (logseq.settings["Keyboard-Shortcut5"])
      }
    }, async (e) => {
      toggleState(logseqSettings["CommaSeparatedOptions5"], e)
    });
  }
}
logseq.ready(main).catch(console.error);
