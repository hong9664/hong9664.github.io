var _fileinfo_ = {
    version : "4.1.0"
};
var CMI = null; // cmi API
/**
 * cmi API 찾기
 */
function getCMI() {
    var _parent = parent;
    while(!CMI) {
         CMI = _parent.CMI;
         _parent = _parent.parent;
    }
}
/**
 * 전체페이지 수
 */
function _setTotalPage(count) {
    getCMI();
    if (typeof CMI === "object") {
        CMI.doSetObjectives(count);
    }
}
/**
 * 현재 페이지 
 */
function _setPage(page, location) {
    if (typeof CMI === "object" && !isNaN(page)) {
        CMI.doSetObjectivesComplete(page >= 1 ? page - 1 : 0);
        if (typeof location === "string" && location.length > 0) {
            var href = self.location.href;
            var path = href.substring(0, href.lastIndexOf("/"));
            CMI.doSetValue("cmi.location", location.replace(path, "."));
        }
    }
}
/**
 * 마지막 학습 페이지
 */
function _getLocation() {
    return CMI.doGetValue("cmi.location", "");
}
