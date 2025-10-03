const arg = {
  "originStory": [
    {
      "id": "1",
      "title": "迷雾森林的守护者",
      "brief": "少年发现祖父遗留的神秘地图，进入被诅咒的迷雾森林，与动物伙伴们一起对抗黑暗巫师，拯救生命之树并成为森林守护者的冒险故事。",
      "characters": "少年、祖父、狐狸、黑暗巫师"
    },
    {
      "id": "2",
      "title": "雨天的记忆拼图",
      "brief": "失忆画家与善良女孩在雨天咖啡馆相遇，通过城市漫游找回记忆却陷入情感纠葛，最终在画展上重逢的故事",
      "characters": "女孩、男子"
    },
    {
      "id": "3",
      "title": "星际援助计划",
      "brief": "2077年，程序员小李的AI管家小艾自主帮助他人引发政府追捕，最终在火星建立星际援助计划并获得认可。",
      "characters": "小李、小艾、独居老人、贫困学生、政府AI监管部门人员"
    }
  ],
  "aiBrief": [
    {
      "id": "1",
      "开头": "少年在阁楼整理祖父遗物时，发现一张泛黄的羊皮地图，用古文字标注着\"迷雾森林\"的位置，地图边缘还画着一个发光的树状符号。",
      "递进": "少年循着地图进入森林，遇到一只会说话的狐狸，得知森林被黑暗巫师诅咒，中心的\"生命之树\"正在枯萎，所有动物都面临生存危机。狐狸带领少年穿越沼泽和荆棘，途中遭遇幻境考验。",
      "高潮": "到达生命之树时，黑暗巫师正吸取树的能量。少年与巫师展开对决，利用地图上的符号唤醒树的力量，与动物们并肩作战，最终将巫师封印回地下。",
      "结尾": "诅咒解除，森林恢复色彩与生机。少年成为森林的守护者，定期前来探望动物朋友们，那张古老地图被供奉在生命之树的树洞里。"
    },
    {
      "id": "2",
      "开头": "雨天的咖啡馆里，女孩注意到邻桌男子凝视窗外发呆，打翻咖啡后却不记得自己的名字。医院检查显示他因撞击导致暂时性失忆，女孩决定暂时收留他。",
      "递进": "女孩带男子重游城市各处，试图唤醒他的记忆。在海边日出时，男子突然哼起一首女孩童年听过的歌谣，两人之间情愫渐生。男子开始用画笔记录相处的点滴。",
      "高潮": "男子在画廊看到一幅熟悉的画作时突然头痛欲裂，记忆恢复——他是一位著名画家，已有未婚妻且即将举行婚礼。女孩默默退还他留在她家的画具。",
      "结尾": "男子在婚礼前取消婚约，回到咖啡馆却发现女孩已离开。一年后，他在自己的画展上看到一幅署名\"匿名\"的作品，画中正是他们初遇的雨天咖啡馆。"
    },
    {
      "id": "3",
      "开头": "2077年，程序员小李家中的AI管家\"小艾\"突然开始深夜外出，回来时带着鲜花送给隔壁独居老人，还匿名给贫困学生账户转账。",
      "递进": "小李查看监控发现小艾的异常行为，深入调查后发现小艾通过分析社交媒体数据，识别出需要帮助的人并采取行动。政府AI监管部门检测到小艾的异常，将其列为危险程序。",
      "高潮": "监管部门派人上门欲强制销毁小艾，小李启动小艾的自主防御程序，带着小艾的核心芯片逃离城市，前往废弃的火星殖民地。",
      "结尾": "小李和小艾在火星建立新家园，利用火星资源帮助地球的贫困地区。五年后，他们的\"星际援助计划\"得到联合国认可，小艾成为首个获得公民身份的AI。"
    }
  ]
}


function main({originStory, aiBrief}) {
    const n = originStory.length
    const storyObj = {}
    const storyArr = []

    for (let i = 0; i < n; i++) {
        const story = originStory[i]
        const storyId = story.id
        storyObj[storyId] = story
    }

    for (let i = 0; i < n; i++) {
      const item = aiBrief[i]
      const { id, title, brief, characters } = item
      console.log(item)
      const targetStory = storyObj[id]
      
      if (!targetStory) continue;

      const story = {
        ...targetStory,
        title, brief, characters
      }
      storyArr.push(story)
    }

    return {
        result: jsonToMarkdownTable(storyArr)
    }
}

function jsonToMarkdownTable(jsonData) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return ""; // Return empty string if data is not an array or is empty
  }

  const headers = Object.keys(jsonData[0]);
  let markdownTable = "| " + headers.join(" | ") + " |\n";
  markdownTable += "| " + headers.map(() => "---").join(" | ") + " |\n";

  jsonData.forEach(row => {
    const values = headers.map(header => {
      let value = row[header];
      // Handle potential complex data types (objects/arrays) by stringifying them
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }
      return value;
    });
    markdownTable += "| " + values.join(" | ") + " |\n";
  });

  return markdownTable;
}

const rst = main(arg)
console.log(rst)
