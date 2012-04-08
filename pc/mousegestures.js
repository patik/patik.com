var mgActiveMappings =
{
  mappings :
  {
    browser    : new Array(),
    viewsource : new Array(),
    window     : new Array(),
    messenger  : new Array(),
    mailcompose: new Array()
  },

  /* for description: chrome://mozgest/content/defaults.js */

  init : function()
  {
    var b = this.mappings.browser;
    b["DRDLU"] = {func: "mgB_AddBookmark", count: 0}
    b[":20"] = {func: "mgB_Back", count: 2}
    b["L"] = {func: "mgB_Back", count: 200}
    b["D"] = {func: "true|false|false|false|0|119", type: "2", name: "Ctrl-W", count: 227}
    b["RUDR"] = {func: "mgB_DoubleStackWin", count: 0}
    b[":02"] = {func: "mgB_Forward", count: 0}
    b["R"] = {func: "mgB_Forward", count: 10}
    b["9"] = {func: "mgB_HideImage", count: 34}
    b["U"] = {func: "mgB_OpenTab", count: 16}
    b[":12"] = {func: "mgB_NextTab", count: 0}
    b[":2+"] = {func: "mgB_NextTab", count: 0}
    b["UR"] = {func: "mgB_NextTab", count: 2}
    b["*RUL"] = {func: "mgB_LinksInTabs", count: 0}
    b["*RU"] = {func: "mgB_LinksInWindows", count: 0}
    b[":10"] = {func: "mgB_PreviousTab", count: 1}
    b[":2-"] = {func: "mgB_PreviousTab", count: 0}
    b["UL"] = {func: "mgB_PreviousTab", count: 1}
    b["UD"] = {func: "mgB_Reload", count: 6}
    b["LU"] = {func: "mgB_Stop", count: 0}
    b["ULU"] = {func: "mgB_UpDir", count: 0}
    b["RD"] = {func: "mgB_ViewPageInfo", count: 0}
    b["LDRDL"] = {func: "mgB_ViewPageSource", count: 0}
    b["31"] = {func: "mgB_ZoomIn", count: 0}
    b["3"] = {func: "mgB_ZoomIn_DoubleImage", count: 1}
    b["13"] = {func: "mgB_ZoomOut", count: 0}
    b["7"] = {func: "mgB_ZoomOut_HalveImage", count: 1}

    var vs = this.mappings.viewsource;
    vs["3"] = {func: "mgB_ZoomIn", count: 0}
    vs["7"] = {func: "mgB_ZoomOut", count: 0}

    var w = this.mappings.window;
    w["DRD"] = {func: "mgW_CloseWin", count: 0}
    w["DL"] = {func: "mgW_MinWin", count: 2}
    w["RU"] = {func: "mgW_RestMaxWin", count: 0}

    var m = this.mappings.messenger;
    m["D"] = {func: "mgM_NewMessage", count: 0}
    m["DRU"] = {func: "mgM_DeleteMessage", count: 0}
    m["DURL"] = {func: "mgM_ForwardMessage", count: 0}
    m["9"] = {func: "mgB_HideImage", count: 0}
    m["DURD"] = {func: "mgM_Home", count: 0}
    m[":02"] = {func: "mgM_NextMessage", count: 0}
    m["R"] = {func: "mgM_NextMessage", count: 0}
    m["*RUL"] = {func: "mgM_OpenLinks", count: 0}
    m[":20"] = {func: "mgM_PrevMessage", count: 0}
    m["L"] = {func: "mgM_PrevMessage", count: 0}
    m["UD"] = {func: "mgM_Reload", count: 0}
    m["DUR"] = {func: "mgM_ReplyMessage", count: 0}
    m["1"] = {func: "mgB_ResetZoom", count: 0}
    m["URD"] = {func: "mgM_ViewSource", count: 0}
    m["31"] = {func: "mgB_ZoomIn", count: 0}
    m["3"] = {func: "mgB_ZoomIn_DoubleImage", count: 0}
    m["13"] = {func: "mgB_ZoomOut", count: 0}
    m["7"] = {func: "mgB_ZoomOut_HalveImage", count: 0}

    var mc = this.mappings.mailcompose;

  },

  getMappings : function()
  {
    return this.mappings
  }
}