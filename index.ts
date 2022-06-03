import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import  'logseq-dateutils';
import { getDateForPageWithoutBrackets } from 'logseq-dateutils';

let logseqSettings = logseq.settings
const stateOptions = ["Only Change current block", "Change current block and block below"]
const parseTemplate = async (template) => {
  //Create a date object iwth today's date
  let date = new Date()
  let dateString = getDateForPageWithoutBrackets(date, (await logseq.App.getUserConfigs()).preferredDateFormat)
  
  //Replace {date} with the date
  template = template.replaceAll(/{date}/gi, dateString)
  //Create a time object with the current time
  let time = new Date()
  let timeString = formatTime()
  //Replace {time} with the time
  template = template.replaceAll(/{time}/gi, timeString)
  //Replace {currentPage} with the current page
  template = template.replaceAll(/{currentPage}/gi, await logseq.Editor.getCurrentPage())

  return ` ${template}`

}

function formatTime() {
  let formattedTimeStamp = new Date();
  let initialHours = formattedTimeStamp.getHours();
  let hours;
  if (initialHours == 0) {
    hours = "00";
  } else {
    hours = initialHours;
    if (formattedTimeStamp.getHours() < 10) {
      hours = "0" + formattedTimeStamp.getHours();
    }
  }
  var formattedTime;
  if (formattedTimeStamp.getMinutes() < 10) {
    formattedTime = hours + ":" + "0" + formattedTimeStamp.getMinutes();
  } else {
    formattedTime = hours + ":" + formattedTimeStamp.getMinutes();
  }
  // if (
  //   typeof logseq.settings.timeFormat == "undefined" ||
  //   logseq.settings.timeFormat == "12 hour time"
  // ) {
  //   return new Date("1970-01-01T" + formattedTime + "Z").toLocaleTimeString(
  //     "en-US",
  //     { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
  //   );
  // } else {
    return formattedTime;
  // }

}

async function toggleState(SeparatedArray, uuid, template) {
  let block = await logseq.Editor.getBlock(uuid)
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
        else if (commaSeparatedArray[index + 2] == undefined) {
          finalText = commaSeparatedArray[index + 1]
          insertionTracker = true
          logseq.Editor.updateBlock(uuid, finalText + block.content.replace(blockFirstWord, '') + await parseTemplate(template))
          break 
        }
        else {
          finalText = commaSeparatedArray[index + 1]
          insertionTracker = true
        }
        logseq.Editor.updateBlock(uuid, finalText + block.content.replace(blockFirstWord, ''))
        
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
    default: "TODO, CANCELLED, WAITING, DONE"
  },
  {
    key: "Keyboard-Shortcut",
    type: "string",
    title: "keyboard shortcut for Workflow 1",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: "mod+shift+enter"
  },
  {
    key: "ToggleStateofBlockBelow",
    type: "enum",
    title: "Toggle State of Block below",
    description: "Toggle State of Block Below. i.e. if the top block was now, and the block below was TODO, the top block will become DONE and the bottom will become DOING",
    enumChoices: stateOptions,
    enumPicker: "radio",
    default: "Only Change current block"
  },
  {
    key: "AppendOnDone",
    type: "string",
    title: "Append on final workflow item?",
    description: "When the task is or workflow reaches the final state, this text will be appended. You can use the following variables: {DATE}, {TIME} and {CurrentPage}. Leave blank to disable",
    default: ""

  },
  {
    key: "CommaSeparatedOptions2",
    type: "string",
    title: "Options for Workflow 2",
    description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
    default: ""
  },
  {
    key: "ToggleStateofBlockBelow2",
    type: "enum",
    title: "Toggle State of Block below",
    description: "Toggle State of Block Below. i.e. if the top block was now, and the block below was TODO, the top block will become DONE and the bottom will become DOING",
    enumChoices: stateOptions,
    enumPicker: "radio",
    default: "Only Change current block"
  },
  {
    key: "Keyboard-Shortcut2",
    type: "string",
    title: "keyboard shortcut for Workflow 2",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "AppendOnDone2",
    type: "string",
    title: "Append on final workflow item?",
    description: "When the task is or workflow reaches the final state, this text will be appended. You can use the following variables: {DATE}, {TIME} and {CurrentPage}. Leave blank to disable",
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
    key: "ToggleStateofBlockBelow3",
    type: "enum",
    title: "Toggle State of Block below",
    description: "Toggle State of Block Below. i.e. if the top block was now, and the block below was TODO, the top block will become DONE and the bottom will become DOING",
    enumChoices: stateOptions,
    enumPicker: "radio",
    default: "Only Change current block"
  },
  {
    key: "Keyboard-Shortcut3",
    type: "string",
    title: "keyboard shortcut for Workflow 3",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "AppendOnDone3",
    type: "string",
    title: "Append on final workflow item?",
    description: "When the task is or workflow reaches the final state, this text will be appended. You can use the following variables: {DATE}, {TIME} and {CurrentPage}. Leave blank to disable",
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
    key: "ToggleStateofBlockBelow4",
    type: "enum",
    title: "Toggle State of Block below",
    description: "Toggle State of Block Below. i.e. if the top block was now, and the block below was TODO, the top block will become DONE and the bottom will become DOING",
    enumChoices: stateOptions,
    enumPicker: "radio",
    default: "Only Change current block"
  },
  {
    key: "Keyboard-Shortcut4",
    type: "string",
    title: "keyboard shortcut for Workflow 4",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "AppendOnDone4",
    type: "string",
    title: "Append on final workflow item?",
    description: "When the task is or workflow reaches the final state, this text will be appended. You can use the following variables: {DATE}, {TIME} and {CurrentPage}. Leave blank to disable",
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
    key: "ToggleStateofBlockBelow5",
    type: "enum",
    title: "Toggle State of Block below",
    description: "Toggle State of Block Below. i.e. if the top block was now, and the block below was TODO, the top block will become DONE and the bottom will become DOING",
    enumChoices: stateOptions,
    enumPicker: "radio",
    default: "Only Change current block"
  },
  {
    key: "Keyboard-Shortcut5",
    type: "string",
    title: "keyboard shortcut for Workflow 5",
    description: "Choose your desired keyboard shortcut to toggle the changes",
    default: ""
  },
  {
    key: "AppendOnDone5",
    type: "string",
    title: "Append on final workflow item?",
    description: "When the task is or workflow reaches the final state, this text will be appended. You can use the following variables: {DATE}, {TIME} and {CurrentPage}. Leave blank to disable",
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
      const blocks = await logseq.Editor.getSelectedBlocks()
      if (blocks != undefined && blocks.length > 0){
        for (const x in blocks){
          toggleState(logseqSettings["CommaSeparatedOptions"], blocks[x].uuid, logseqSettings["AppendOnDone"])
        }
      }
      else if (logseq.settings["ToggleStateofBlockBelow"] == "Only Change current block") {
        toggleState(logseqSettings["CommaSeparatedOptions"], e.uuid, logseqSettings["AppendOnDone"])
      }
      else {
        toggleState(logseqSettings["CommaSeparatedOptions"], e.uuid, logseqSettings["AppendOnDone"])
        toggleState(logseqSettings["CommaSeparatedOptions"], (await logseq.Editor.getNextSiblingBlock(e.uuid)).uuid, logseqSettings["AppendOnDone"])
      }
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
      if (logseq.settings["ToggleStateofBlockBelow2"] == "Only Change current block") {
        toggleState(logseqSettings["CommaSeparatedOptions2"], e.uuid, logseqSettings["AppendOnDone2"])
      }
      else {
        toggleState(logseqSettings["CommaSeparatedOptions2"], e.uuid, logseqSettings["AppendOnDone2"])
        toggleState(logseqSettings["CommaSeparatedOptions2"], (await logseq.Editor.getNextSiblingBlock(e.uuid)).uuid, logseqSettings["AppendOnDone2"])
      }
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
      if (logseq.settings["ToggleStateofBlockBelow3"] == "Only Change current block") {
        toggleState(logseqSettings["CommaSeparatedOptions3"], e.uuid, logseqSettings["AppendOnDone3"])
      }
      else {
        toggleState(logseqSettings["CommaSeparatedOptions3"], e.uuid, logseqSettings["AppendOnDone3"])
        toggleState(logseqSettings["CommaSeparatedOptions3"], (await logseq.Editor.getNextSiblingBlock(e.uuid)).uuid, logseqSettings["AppendOnDone3"])
      }
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
      if (logseq.settings["ToggleStateofBlockBelow4"] == "Only Change current block") {
        toggleState(logseqSettings["CommaSeparatedOptions4"], e.uuid, logseqSettings["AppendOnDone4"])
      }
      else {
        toggleState(logseqSettings["CommaSeparatedOptions4"], e.uuid, logseqSettings["AppendOnDone4"])
        toggleState(logseqSettings["CommaSeparatedOptions4"], (await logseq.Editor.getNextSiblingBlock(e.uuid)).uuid, logseqSettings["AppendOnDone4"])
      }
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
      if (logseq.settings["ToggleStateofBlockBelow5"] == "Only Change current block") {
        toggleState(logseqSettings["CommaSeparatedOptions5"], e.uuid, logseqSettings["AppendOnDone5"])
      }
      else {
        toggleState(logseqSettings["CommaSeparatedOptions5"], e.uuid, logseqSettings["AppendOnDone5"])
        toggleState(logseqSettings["CommaSeparatedOptions5"], (await logseq.Editor.getNextSiblingBlock(e.uuid)).uuid, logseqSettings["AppendOnDone5"])
      }
    });
  }
}
logseq.ready(main).catch(console.error);
