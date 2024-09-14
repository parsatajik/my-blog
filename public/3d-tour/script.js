(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "minHeight": 20,
 "children": [
  "this.MainViewer",
  "this.Container_0B074894_07F5_1264_4191_8C3F0D97D974",
  "this.Container_7C33F29E_70DD_289C_41CE_48B5812E5B61",
  "this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77",
  "this.Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA"
 ],
 "scrollBarVisible": "rollOver",
 "backgroundPreloadEnabled": true,
 "start": "this.init(); this.syncPlaylists([this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist,this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist,this.mainPlayList]); this.playList_8D55FD1F_8285_F70C_41D8_3553E2649DC7.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_7D01D0B8_70F7_68A4_41AA_C8C58B453F68].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 20,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_7D01D0B8_70F7_68A4_41AA_C8C58B453F68",
 "scripts": {
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "registerKey": function(key, value){  window[key] = value; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "existsKey": function(key){  return key in window; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getKey": function(key){  return window[key]; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } }
 },
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "paddingRight": 0,
 "height": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "height": 1080,
 "duration": 5000,
 "label": "Powder room",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_1",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_1_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_1.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Laundry",
 "id": "photo_7FB63CAA_70EB_38A7_41C8_F71AD5D9175A",
 "thumbnailUrl": "media/photo_7FB63CAA_70EB_38A7_41C8_F71AD5D9175A_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB63CAA_70EB_38A7_41C8_F71AD5D9175A.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "items": [
  {
   "media": "this.panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_camera"
  },
  "this.PanoramaPlayListItem_8D55ED21_8285_F734_41D4_EBA6AF6E6DFE",
  {
   "media": "this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_camera"
  },
  "this.PanoramaPlayListItem_8D557D22_8285_F734_41C8_AF5B6A47DBD1",
  "this.PanoramaPlayListItem_8D54CD23_8285_F734_41DA_1D42568CF71C",
  "this.PanoramaPlayListItem_8D541D23_8285_F734_41D3_0F2E2C4E5259",
  "this.PanoramaPlayListItem_8D546D24_8285_F73C_41A2_F20FF0D251E4",
  "this.PanoramaPlayListItem_8D57BD24_8285_F73C_419D_9DE2ECF89A73",
  "this.PanoramaPlayListItem_8D570D25_8285_F73C_41C4_4C0CCDF7D300",
  "this.PanoramaPlayListItem_8D576D25_8285_F73C_41CD_788E11707F1B",
  {
   "media": "this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_camera"
  },
  "this.PanoramaPlayListItem_8D56FD26_8285_F73C_41E0_14AE440D35DF",
  "this.PanoramaPlayListItem_8D564D27_8285_F73C_41C4_780B21690AC4",
  {
   "media": "this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_camera"
  },
  "this.PanoramaPlayListItem_8D69DD28_8285_F734_41E0_0F574E73B9E2",
  "this.PanoramaPlayListItem_8D691D28_8285_F734_41D8_362359A029CF",
  "this.PanoramaPlayListItem_8D696D29_8285_F734_41D1_5DB36FF1FC37",
  {
   "media": "this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_camera"
  },
  {
   "media": "this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_camera"
  },
  "this.PanoramaPlayListItem_8D683D2B_8285_F734_41A9_C0E4ABEF7E3B",
  {
   "media": "this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_camera"
  },
  "this.PanoramaPlayListItem_8D6BCD2B_8285_F734_41DF_54C8DF0158B1",
  "this.PanoramaPlayListItem_8D6B0D2C_8285_F70C_41D8_6E23D4B06B62",
  "this.PanoramaPlayListItem_8D6B6D2C_8285_F70C_41DE_3C6F20F6DC94",
  "this.PanoramaPlayListItem_8D6ACD2D_8285_F70C_41C7_58C206C6E16B",
  {
   "media": "this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bedroom 4",
 "id": "photo_7FB60F46_70EB_79EF_41C9_A3F0AC41F9CE",
 "thumbnailUrl": "media/photo_7FB60F46_70EB_79EF_41C9_A3F0AC41F9CE_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB60F46_70EB_79EF_41C9_A3F0AC41F9CE.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -72.92,
   "backwardYaw": -120,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  }
 ],
 "label": "bathroom 1",
 "id": "panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5",
 "overlays": [
  "this.overlay_128E4014_05EE_CEAB_4196_D642E6E2BC25"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -48.61,
   "backwardYaw": 141.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  }
 ],
 "label": "bathroom",
 "id": "panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE",
 "overlays": [
  "this.overlay_1A31AAD1_05AB_F3AC_4192_6B5F364DC813"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "x": 164.95,
   "angle": 130.35,
   "class": "PanoramaMapLocation",
   "y": 414.95
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 109.28,
  "pitch": -14.45,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEA863E_6DC0_599F_41D7_C2456B2785EA",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D551D1F_8285_F70C_41D1_07F3C2C06975",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 86.79,
  "pitch": -1,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEA963E_6DC0_599F_41D0_1BFDB3916A05",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 47.45,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_930D707D_8285_ED0C_41DF_091FAAD69E2F",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_930D407D_8285_ED0C_41D5_E277FBF59BC4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 88.32,
  "pitch": 1.32,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9163D_6DC0_599D_41A0_F8817028942B",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 85.95,
  "pitch": 0.93,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9063D_6DC0_599D_41CE_8DC0964A9EB2",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 91.03,
  "pitch": -4.36,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEAB63E_6DC0_599F_41D3_BBE17E4ABB52",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -153.56,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93CEF034_8285_ED1C_41C9_E34FA3C2CCBD",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93CED034_8285_ED1C_41C5_EFD890290692",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA_camera"
  },
  {
   "media": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_camera"
  },
  {
   "media": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_camera"
  },
  {
   "media": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist, 3, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128_camera"
  }
 ],
 "id": "DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 1.13,
  "pitch": -1.22,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEAC63F_6DC0_599D_41BD_2347D29D77AB",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_7894145C_69BF_A30B_41D7_CF0F58331128_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bedroom 3",
 "id": "photo_7FB23732_70EB_29A4_41CD_B60AF22458A1",
 "thumbnailUrl": "media/photo_7FB23732_70EB_29A4_41CD_B60AF22458A1_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB23732_70EB_29A4_41CD_B60AF22458A1.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -87.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93571144_8285_EF7A_41DF_EA6B5692F5AC",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9357E144_8285_EF7D_41E0_4FED583189CC",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 18.81,
   "backwardYaw": -3.22,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C"
  },
  {
   "yaw": -166.07,
   "backwardYaw": -85.02,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA"
  }
 ],
 "label": "bedroom 3",
 "id": "panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C",
 "overlays": [
  "this.overlay_1C921E96_0596_33D7_4173_072F0C8D0EE0",
  "this.overlay_1C648E38_05AA_52DB_418D_BD962D1864CC"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "x": 215,
   "angle": 183.26,
   "class": "PanoramaMapLocation",
   "y": 182.1
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 88.73,
  "pitch": -4.65,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEAE63E_6DC0_599F_41AB_626F2E59BB56",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bathroom 4",
 "id": "photo_7FB114B2_70EB_68A7_41C5_788F60F75825",
 "thumbnailUrl": "media/photo_7FB114B2_70EB_68A7_41C5_788F60F75825_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB114B2_70EB_68A7_41C5_788F60F75825.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 5.25,
  "pitch": -2.78,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9663D_6DC0_599D_41D3_DB4BAD0C3A58",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bathroom 3",
 "id": "photo_7FBBE9EF_70EB_38BC_41C6_D344A4B82BE2",
 "thumbnailUrl": "media/photo_7FBBE9EF_70EB_38BC_41C6_D344A4B82BE2_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FBBE9EF_70EB_38BC_41C6_D344A4B82BE2.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Kitchen",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_4",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_4_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_4.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D52ED20_8285_F734_41BA_9BC3D5DAF934",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 176.97,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92834DB4_8285_F71C_41CD_F7C974C8037F",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92833DB4_8285_F71C_41C6_5295F26D7EA1",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -3.03,
   "backwardYaw": 19.72,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  },
  {
   "yaw": 78.53,
   "backwardYaw": -66.12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3"
  }
 ],
 "label": "gym",
 "id": "panorama_19A9C854_05BE_3F54_4164_F939C1833B65",
 "overlays": [
  "this.overlay_1B446937_05AE_3ED5_4192_5410C620FA37",
  "this.overlay_1AE4B288_05AE_33BC_4168_C1580D20328E"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "x": 103.55,
   "angle": 89.61,
   "class": "PanoramaMapLocation",
   "y": 612.45
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 94.98,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9395EFFE_8285_F30C_41E0_14D264826789",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9395DFFD_8285_F30C_419B_D538E718A628",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 94.63,
  "pitch": -4.66,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7B0BA612_6DC0_5967_41D5_E4543B0A7A9B",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_08E45B5C_059E_5154_417A_ED172912D8FA_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 60,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92A8BE01_8285_F4F4_41D5_8158A439C657",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92A89E01_8285_F4F4_41CE_665BDE07A3D4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -95.08,
  "pitch": 1.66,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9963C_6DC0_59A3_417F_552B22AF25C2",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -15.15,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_924EBF6E_8285_F30C_41CF_3FF87C366BEB",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_924E9F6E_8285_F30C_41CA_CE034B7DDFC3",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "recreation room",
 "id": "photo_7F7C670A_70EB_6967_41D6_C15B5EA68E3D",
 "thumbnailUrl": "media/photo_7F7C670A_70EB_6967_41D6_C15B5EA68E3D_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7F7C670A_70EB_6967_41D6_C15B5EA68E3D.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "id": "effect_61C6C587_70D5_696D_4147_2B45033C6F2A",
 "easing": "linear",
 "duration": 500,
 "class": "FadeInEffect"
},
{
 "id": "effect_764B50D0_5098_666A_41CA_D502B62644A1",
 "easing": "quad_in",
 "duration": 200,
 "class": "FadeOutEffect"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -76.02,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92FF9EC5_8285_F57C_41DE_340C3D1E97BE",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92FC6EC5_8285_F57C_41D1_9F9A47C2E22E",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bedroom 2",
 "id": "photo_7F552131_70EB_29A5_41D7_21DB2E0C552E",
 "thumbnailUrl": "media/photo_7F552131_70EB_29A5_41D7_21DB2E0C552E_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7F552131_70EB_29A5_41D7_21DB2E0C552E.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -166.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_926A1FA6_8285_F33C_416B_3598D2F8D7B4",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_926AFFA6_8285_F33C_41D4_3AF70A9C1488",
 "automaticZoomSpeed": 10
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 149.82,
   "backwardYaw": 26.44,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15"
  }
 ],
 "label": "dog wash",
 "id": "panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E",
 "overlays": [
  "this.overlay_148CD8B5_196B_5B4E_4187_67E480AF5A48",
  "this.overlay_148C98B5_196B_5B4E_41A6_991EBBD0D766",
  "this.overlay_148C68B5_196B_5B4E_41B3_D74DD2903FF9"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -91.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9209CEE0_8285_F534_41DA_04802B683D5C",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9209AEE0_8285_F534_41CC_BC60410434D6",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 88.89,
   "backwardYaw": 4.2,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  }
 ],
 "label": "lobby",
 "id": "panorama_117867BC_05BE_71DB_418D_23EE4304808C",
 "overlays": [
  "this.overlay_11B1828E_05AE_53B7_4196_6DE148B6369E",
  "this.overlay_11DCF7DF_05AA_5154_4165_B58D7FDE40F3"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "x": 246.75,
   "angle": -90.91,
   "class": "PanoramaMapLocation",
   "y": 636.2
  }
 ],
 "vfov": 180
},
{
 "height": 1400,
 "duration": 5000,
 "label": "Approach View ",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_0",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_0_t.png",
 "width": 2400,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_0.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer"
},
{
 "id": "effect_7002FB9E_6E40_4E9E_41D4_07F5B09341D3",
 "easing": "quad_in",
 "duration": 2000,
 "class": "FadeInEffect"
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Gym",
 "id": "photo_7FB3EC3E_70EB_7F9C_418A_5C637889DABE",
 "thumbnailUrl": "media/photo_7FB3EC3E_70EB_7F9C_418A_5C637889DABE_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB3EC3E_70EB_7F9C_418A_5C637889DABE.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D55FD1F_8285_F70C_41D8_3553E2649DC7",
 "class": "PlayList"
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 63.91,
   "backwardYaw": 173.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  }
 ],
 "label": "living room",
 "id": "panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E",
 "overlays": [
  "this.overlay_7BD812AB_69B7_670D_41D0_4D8220600A6D"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "x": 151.9,
   "angle": 93.65,
   "class": "PanoramaMapLocation",
   "y": 249.95
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 90.9,
  "pitch": -12.44,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9E640_6DC0_59E3_41C7_FF2F8F53CB24",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 130.4,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92DC9E7B_8285_F514_41C5_BD41F68686B0",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92DC8E7B_8285_F514_41D7_D7F499ECBB58",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 151.71,
  "pitch": -48.52,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEAA63E_6DC0_599F_41D3_3AB2204DC76D",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 143.96,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_921F0F18_8285_F314_41D3_4764991B547C",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_921FFF18_8285_F314_41DB_CC599CAFB6E3",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 7.91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92899D83_8285_F7F4_41B4_C63A210CFA29",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92898D83_8285_F7F4_41C0_C84B712D06AB",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Master bedroom",
 "id": "photo_60C81D41_70F5_39E4_41DA_17B358FA3401",
 "thumbnailUrl": "media/photo_60C81D41_70F5_39E4_41DA_17B358FA3401_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_60C81D41_70F5_39E4_41DA_17B358FA3401.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "id": "effect_7FE5E962_70FD_79A7_41D6_E37F95A170DA",
 "easing": "linear",
 "duration": 1000,
 "class": "FadeInEffect"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D553D1F_8285_F70C_41C6_DDE94E9226FA",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -101.47,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9082D1B8_8285_EF15_41DD_D160A7C8738E",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9082B1B8_8285_EF15_41BA_C90E4320DF77",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 93.19,
   "backwardYaw": 1.8,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  },
  {
   "yaw": -3.22,
   "backwardYaw": 18.81,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C"
  },
  {
   "yaw": -154.4,
   "backwardYaw": -12.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288"
  },
  {
   "yaw": 13.87,
   "backwardYaw": -97.78,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4"
  }
 ],
 "label": "Third Floor",
 "id": "panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C",
 "overlays": [
  "this.overlay_7ACB2B9E_69B4_A507_4199_24DB5AD67BA9",
  "this.overlay_7ACB3B9F_69B4_A505_41C4_72C5E496BA8B",
  "this.overlay_7ACB0B9F_69B4_A505_41D0_A5233DA25630",
  "this.overlay_7AC8EB9F_69B4_A505_41D4_5DA32DE0492E"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "x": 155,
   "angle": -8.17,
   "class": "PanoramaMapLocation",
   "y": 474.05
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 92.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_931B6090_8285_ED14_41D7_CC9486681A7B",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_931B4090_8285_ED14_41DE_73FFF443F540",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -178.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92A22E1B_8285_F514_41BA_EFBCD036664C",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92A21E1A_8285_F514_41D6_CCF361B85E8C",
 "automaticZoomSpeed": 10
},
{
 "class": "PhotoAlbum",
 "label": "Photo Album 1",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_t.png",
 "playList": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_AlbumPlayList"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -45.14,
   "backwardYaw": -132.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8"
  }
 ],
 "label": "master bathroom",
 "id": "panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47",
 "overlays": [
  "this.overlay_12314188_0596_31BC_4124_3B553515CB40"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 133.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9205BEFD_8285_F50C_4145_6C3AB9A5D43A",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92059EFD_8285_F50C_41D1_571625E04272",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 30,
  "yaw": -1.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera",
 "id": "panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_camera",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -31.97,
   "backwardYaw": -49.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  }
 ],
 "label": "bedroom 1",
 "id": "panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77",
 "overlays": [
  "this.overlay_12CA7D39_05EA_56DD_418D_CAF2F783E623"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "x": 243.45,
   "angle": -84.75,
   "class": "PanoramaMapLocation",
   "y": 387.95
  }
 ],
 "vfov": 180
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 872,
 "fieldOfViewOverlayRadiusScale": 0.1,
 "id": "map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
 "width": 295,
 "label": "first floor",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A.png",
    "width": 295,
    "height": 872,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_lq.png",
    "width": 148,
    "tags": "preload",
    "height": 438,
    "class": "ImageResourceLevel"
   }
  ]
 },
 "overlays": [
  "this.overlay_189B0756_0835_1EE4_419D_46841480DBD7",
  "this.overlay_18254BCE_0833_35E4_418F_1CD6B52BCDB2",
  "this.overlay_1EE72A9B_080D_166C_4182_BEEA789D1AAA",
  "this.overlay_1929BBBE_080D_35A4_4176_DB6FD1E5EB84",
  "this.overlay_1CC537E4_080D_1DA4_4144_9B94610F9BA0"
 ],
 "minimumZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "thumbnailUrl": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_t.png",
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.43,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1,
 "initialZoomFactor": 1
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -46.39,
   "backwardYaw": 121.97,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  },
  {
   "yaw": 164.85,
   "backwardYaw": 74.11,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11FD5776_0596_3157_418C_8BCECD289C58"
  }
 ],
 "label": "kitchen",
 "id": "panorama_1120540D_059A_56B5_4175_4B4CCB7A408D",
 "overlays": [
  "this.overlay_11C33AED_0599_F375_417A_E2F31850BEC5",
  "this.overlay_117D15C7_059B_D1B5_4194_95F765F92860"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "x": 138.95,
   "angle": -178.16,
   "class": "PanoramaMapLocation",
   "y": 433.55
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 13.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93DEB046_8285_ED7C_4189_811A0328F1A5",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93DE8046_8285_ED7C_419B_269F16B91D57",
 "automaticZoomSpeed": 10
},
{
 "buttonNext": "this.IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554",
 "id": "ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615PhotoAlbumPlayer",
 "viewerArea": "this.ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615",
 "class": "PhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 100.55,
  "pitch": -24.4,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9863C_6DC0_59A3_41BE_90C24712FC5C",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -6.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92E98E93_8285_F514_41D5_8D04E6756EBE",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92D67E93_8285_F514_41A5_47B588CA198F",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Living room",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_5",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_5_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_5.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "class": "Panorama",
 "hfovMax": 90,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA"
  }
 ],
 "label": "entrance",
 "id": "panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB",
 "overlays": [
  "this.overlay_2CC330B8_201A_9CD9_41BA_2CB7CCDAA232"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": true,
 "thumbnailUrl": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/0/{row}_{column}.jpg",
      "rowCount": 18,
      "tags": "ondemand",
      "height": 9216,
      "class": "TiledImageResourceLevel",
      "width": 9216,
      "colCount": 18
     },
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/1/{row}_{column}.jpg",
      "rowCount": 9,
      "tags": "ondemand",
      "height": 4608,
      "class": "TiledImageResourceLevel",
      "width": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/2/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/3/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/4/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_0/f/5/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_t.jpg"
  }
 ],
 "hfov": 30,
 "vfov": 17.5
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 125,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  }
 ],
 "label": "First Floor",
 "id": "panorama_08E45B5C_059E_5154_417A_ED172912D8FA",
 "overlays": [
  "this.overlay_11B2A09C_05AA_4FDB_4182_3FE59AEA52A2",
  "this.overlay_6779FC34_69B5_631B_41D6_031408787370"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "x": 246.65,
   "angle": -95.7,
   "class": "PanoramaMapLocation",
   "y": 732.2
  }
 ],
 "vfov": 180
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -87.22,
   "backwardYaw": 86.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  }
 ],
 "label": "living room",
 "id": "panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B",
 "overlays": [
  "this.overlay_7AE30D75_69B5_FD05_41C5_7EF116912C29"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "x": 138.9,
   "angle": 88.89,
   "class": "PanoramaMapLocation",
   "y": 578
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -160.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_922B2F2D_8285_F30C_419E_F224E3CF151D",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_922B1F2D_8285_F30C_41C1_EC1972B14344",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D52FD20_8285_F734_41C4_278488794344",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -58.03,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93A3D010_8285_ED14_41DD_8E2D3713886D",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93A3B010_8285_ED14_41C5_4B49EC34020E",
 "automaticZoomSpeed": 10
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C"
  }
 ],
 "label": "powder room",
 "id": "panorama_103515CB_05AA_71BD_4184_150FCFB3FE01",
 "overlays": [
  "this.overlay_11878858_05BA_7F5B_418A_7C8E3755BE23"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 107.08,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_932B50B6_8285_ED1C_41D0_7C5C13725DAD",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_932B30B6_8285_ED1C_419F_E71CCF20D917",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -93.99,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93ECA059_8285_ED14_41D7_887310CA8818",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93ECB058_8285_ED14_419B_7AB46A0DCFF1",
 "automaticZoomSpeed": 10
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -102.3,
   "backwardYaw": -36.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288"
  }
 ],
 "label": "bath 2",
 "id": "panorama_1EFD1E68_05AE_537B_4196_B581C49310D7",
 "overlays": [
  "this.overlay_1F2C1718_05AA_32DB_4181_6E4AC5C51666"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 148.03,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_934940FE_8285_ED0C_4196_77CA58F06254",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_934900FE_8285_ED0C_41C2_5503CF0E069B",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 131.39,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9299CDCE_8285_F70C_41D0_3D146CD27071",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9299BDCE_8285_F70C_41B3_37F40711D023",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 167.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92C90E4A_8285_F574_41C6_498B6CFC40E3",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92C9EE4A_8285_F574_41B5_25753BEB3470",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 94.26,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92796FC1_8285_F374_41D1_48133E22191D",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92795FC1_8285_F374_41CF_F0D606666EED",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 106.06,
  "pitch": -41.82,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9263D_6DC0_599D_41D0_713FA69EE07E",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -1.97,
  "pitch": -1.89,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AEAD63F_6DC0_599D_41C3_03DFC3B79679",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_11FD5776_0596_3157_418C_8BCECD289C58_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Kitchen/Dining ",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_3",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_3_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_3.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -86.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_933880D6_8285_ED1D_41A1_0DB94ABEBD53",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_933890D6_8285_ED1D_41D3_EBE1F2A2DD91",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 82.22,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92C20E62_8285_F535_41C4_776905B0A453",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92C2FE62_8285_F534_41D4_1AAAAFE32DDC",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -116.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_928D2D9C_8285_F70D_41AD_A4FECB539AB3",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_928D1D9B_8285_F70A_41DD_835E8ECE2953",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D554D1F_8285_F70C_41BD_CC9EC5BD8A68",
 "class": "PlayList"
},
{
 "touchControlMode": "drag_rotation",
 "buttonCardboardView": "this.IconButton_7D01D881_70ED_E765_41D9_2D20215E503C",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 92.46,
  "pitch": -22.16,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9463E_6DC0_599F_41A3_392035B19F92",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bathroom 1",
 "id": "photo_7FB6D44E_70F5_2FFC_41D5_00C04AEEDE7B",
 "thumbnailUrl": "media/photo_7FB6D44E_70F5_2FFC_41D5_00C04AEEDE7B_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FB6D44E_70F5_2FFC_41D5_00C04AEEDE7B.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -85.02,
   "backwardYaw": -166.07,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C"
  }
 ],
 "label": "bathroom 3",
 "id": "panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA",
 "overlays": [
  "this.overlay_1C3E2534_05AA_56D4_418D_A28AD2CA4722"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 89.62,
  "pitch": 0.31,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9A63F_6DC0_599D_41D6_B4E7012FD1CF",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 95.07,
  "pitch": -11.42,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9763D_6DC0_599D_41D2_4812504D63BC",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_camera",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -172.09,
   "backwardYaw": 5.21,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  }
 ],
 "label": "bedroom 4",
 "id": "panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15",
 "overlays": [
  "this.overlay_1A9B47F0_05A9_F16B_4185_29FC59BC6F7D"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "x": 237.45,
   "angle": -176.69,
   "class": "PanoramaMapLocation",
   "y": 679.8
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 90.17,
  "pitch": -1.09,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE98640_6DC0_59E3_41D4_D52D046FCA93",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_117867BC_05BE_71DB_418D_23EE4304808C_camera",
 "automaticZoomSpeed": 10
},
{
 "id": "effect_7FE5F962_70FD_79A7_41D9_BD832243F241",
 "easing": "linear",
 "duration": 1000,
 "class": "FadeOutEffect"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 803,
 "fieldOfViewOverlayRadiusScale": 0.11,
 "id": "map_0C187542_07F7_12DC_4185_7CD0138AD17C",
 "width": 283,
 "label": "basement",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C.png",
    "width": 283,
    "height": 803,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_lq.png",
    "width": 151,
    "tags": "preload",
    "height": 429,
    "class": "ImageResourceLevel"
   }
  ]
 },
 "overlays": [
  "this.overlay_0960B793_07F3_1E7C_417B_5E63700B3B8C",
  "this.overlay_186957A1_081F_3E5C_4192_138AB44B8FD0",
  "this.overlay_1A4C58C5_081D_13E4_4192_61BE78B9A121",
  "this.overlay_1912B07D_0813_12A4_418A_973A5DA56B29",
  "this.overlay_1BC3BA6D_0835_36A4_41A2_F757E23264A4"
 ],
 "minimumZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#CCCCCC",
 "thumbnailUrl": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_t.png",
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.54,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1,
 "initialZoomFactor": 1
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Family room",
 "id": "photo_7F3D4A5F_70F5_3B9C_41D4_0A025D794AEB",
 "thumbnailUrl": "media/photo_7F3D4A5F_70F5_3B9C_41D4_0A025D794AEB_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7F3D4A5F_70F5_3B9C_41D4_0A025D794AEB.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -125.7,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_929E5DE6_8285_F73C_41C3_FFD1E0873A65",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_929E4DE6_8285_F73C_41D8_ED5D460391A8",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 86.01,
   "backwardYaw": -87.22,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B"
  },
  {
   "yaw": -120,
   "backwardYaw": -72.92,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5"
  },
  {
   "yaw": 1.8,
   "backwardYaw": 93.19,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C"
  },
  {
   "yaw": -49.6,
   "backwardYaw": -31.97,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77"
  },
  {
   "yaw": -85.74,
   "backwardYaw": 20.07,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8"
  },
  {
   "yaw": -34.64,
   "backwardYaw": 92.94,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  }
 ],
 "label": "Second floor",
 "id": "panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A",
 "overlays": [
  "this.overlay_7F12BC0E_69D5_A307_41D2_19E6E7150CD2",
  "this.overlay_7363EF5D_69EC_FD05_41A7_CEAD85D0038E",
  "this.overlay_7E4BD44B_69EF_A30D_41C6_A9EAA150E0E3",
  "this.overlay_7E790651_69EC_AF1D_4193_F06AFEEAE876",
  "this.overlay_7E39EAAB_69F3_A70D_41CD_11B9F0BB1A4E",
  "this.overlay_71862B5B_69F4_A50D_41D2_9E562B909E9D"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "x": 116.85,
   "angle": 87.2,
   "class": "PanoramaMapLocation",
   "y": 481.85
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 90.4,
  "pitch": -8.57,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9963F_6DC0_599D_41D0_3CCB05BFBD22",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_11E0C688_0596_73BB_415F_C91017C010A0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -38.86,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_925DEF8C_8285_F30C_41B5_820774AB6A32",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_925DBF8C_8285_F30C_41AE_624E58FA3264",
 "automaticZoomSpeed": 10
},
{
 "id": "effect_7F4D95B0_70F7_28A4_41D4_D814280056AC",
 "easing": "linear",
 "duration": 500,
 "class": "FadeInEffect"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -30.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_8D73BD6E_8285_F70C_41CA_9B34F2F1C643",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_8D739D6E_8285_F70C_41D0_FA32A7DF668B",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 26.44,
   "backwardYaw": 149.82,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E"
  },
  {
   "yaw": 5.21,
   "backwardYaw": -172.09,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15"
  },
  {
   "yaw": 173.91,
   "backwardYaw": 63.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E"
  },
  {
   "yaw": 19.72,
   "backwardYaw": -3.03,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65"
  },
  {
   "yaw": 141.14,
   "backwardYaw": -48.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE"
  },
  {
   "yaw": 103.98,
   "backwardYaw": 54.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  }
 ],
 "label": "Basement ",
 "id": "panorama_7894145C_69BF_A30B_41D7_CF0F58331128",
 "overlays": [
  "this.overlay_7AE601A8_69AD_E50B_41A3_C0A2E8577A4F",
  "this.overlay_7A7ADEB9_69D3_7F0D_41D0_E2FAD822C956",
  "this.overlay_7A312728_69D4_ED0A_41B2_44ADF74C8DC2",
  "this.overlay_7DCF13A2_69D7_E53F_41D0_A5E3A6498A01",
  "this.overlay_7D627459_69D5_A30D_41D6_5FAB783EE993",
  "this.overlay_7D3B8A60_69D3_673B_41DA_5A0B1DCF836D"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "x": 228.45,
   "angle": -174.03,
   "class": "PanoramaMapLocation",
   "y": 493.46
  }
 ],
 "vfov": 180
},
{
 "items": [
  {
   "media": "this.panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_camera"
  },
  {
   "media": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA_camera"
  },
  {
   "media": "this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_camera"
  },
  {
   "media": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C_camera"
  },
  {
   "media": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0_camera"
  },
  {
   "media": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_camera"
  },
  {
   "media": "this.panorama_11FD5776_0596_3157_418C_8BCECD289C58",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_11FD5776_0596_3157_418C_8BCECD289C58_camera"
  },
  {
   "media": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_camera"
  },
  {
   "media": "this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_camera"
  },
  {
   "media": "this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_camera"
  },
  {
   "media": "this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_camera"
  },
  {
   "media": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_camera"
  },
  {
   "media": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_camera"
  },
  {
   "media": "this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_camera"
  },
  {
   "media": "this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_camera"
  },
  {
   "media": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_camera"
  },
  {
   "media": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_camera"
  },
  {
   "media": "this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_camera"
  },
  {
   "media": "this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_camera"
  },
  {
   "media": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128_camera"
  },
  {
   "media": "this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_camera"
  },
  {
   "media": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65_camera"
  },
  {
   "media": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_camera"
  },
  {
   "media": "this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_camera"
  },
  {
   "media": "this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_camera"
  },
  {
   "media": "this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist, 25, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_camera"
  }
 ],
 "id": "ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist",
 "class": "PlayList"
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Lobby",
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_2",
 "thumbnailUrl": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_2_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_60E200CE_70F5_28FC_41D6_35132B7AB833_2.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 134.86,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9389AFD4_8285_F31D_41A6_BD60AFE2E95A",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93899FD3_8285_F31B_41DE_7B22946E5FE7",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 90.69,
  "pitch": -1.56,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9C63C_6DC0_59A3_4189_1CF05769C1AA",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_91BC2C68_8285_F534_41D9_5F5ACD5FE22A, 0)",
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833",
   "player": "this.ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615PhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_91BC2C68_8285_F534_41D9_5F5ACD5FE22A",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 113.88,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92248F40_8285_F374_41CA_EB76B9C502B1",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92257F40_8285_F374_41DD_7E36FB5EFD0C",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0"
  },
  {
   "yaw": 74.11,
   "backwardYaw": 164.85,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D"
  }
 ],
 "label": "living room",
 "id": "panorama_11FD5776_0596_3157_418C_8BCECD289C58",
 "overlays": [
  "this.overlay_117D9731_0596_52ED_418F_D2ECD5C47861",
  "this.overlay_1139C0A7_05EA_4FF5_418E_274A48AD89BE"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "x": 107.55,
   "angle": 87.16,
   "class": "PanoramaMapLocation",
   "y": 281.6
  }
 ],
 "vfov": 180
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 25.6,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_9365616E_8285_EF0D_41D0_CB8FF121F362",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9365516E_8285_EF0D_41AE_E3AAA12F6E72",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D556D20_8285_F734_41C4_601FBAE7C6CE",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D550D1F_8285_F70C_41C1_08AF0EBCB4FF",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D555D1F_8285_F70C_41C5_27C9434061BB",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 88.93,
  "pitch": -3.2,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9F63C_6DC0_59A3_41D1_181BAC11FD02",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_camera",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 20.07,
   "backwardYaw": -85.74,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  },
  {
   "yaw": -132.55,
   "backwardYaw": -45.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47"
  }
 ],
 "label": "masterbedroom",
 "id": "panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8",
 "overlays": [
  "this.overlay_124CC820_05EA_DEEB_4176_6EB6DC3EA824",
  "this.overlay_126B48FF_05EB_DF55_4186_D80CC6326872"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
   "x": 158.8,
   "angle": -174.14,
   "class": "PanoramaMapLocation",
   "y": 161.35
  }
 ],
 "vfov": 180
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -66.12,
   "backwardYaw": 78.53,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65"
  }
 ],
 "label": "gym bath",
 "id": "panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3",
 "overlays": [
  "this.overlay_24CBA8D5_059E_3F55_418F_981AF876A28C"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "thumbnailUrl": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfov": 360,
 "vfov": 180
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 92.94,
   "backwardYaw": -34.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A"
  },
  {
   "yaw": 54.3,
   "backwardYaw": 103.98,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128"
  },
  {
   "yaw": 4.2,
   "backwardYaw": 88.89,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C"
  },
  {
   "yaw": 121.97,
   "backwardYaw": -46.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D"
  }
 ],
 "label": "First Floor Stairs",
 "id": "panorama_11E0C688_0596_73BB_415F_C91017C010A0",
 "overlays": [
  "this.overlay_11F6184E_0596_7EB7_4169_1FC35FF4371D",
  "this.overlay_11451A3F_059A_32D5_4189_0144E940B9B2",
  "this.overlay_10FF66FF_05EA_D355_4142_90C306570D1B",
  "this.overlay_10684630_05E9_D2EB_4194_B93C587D1A06"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A",
   "x": 239.3,
   "angle": -176.04,
   "class": "PanoramaMapLocation",
   "y": 550.25
  }
 ],
 "vfov": 180
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bathroom 2",
 "id": "photo_7F012477_70EB_2FAD_41AB_0B9DFC45E85F",
 "thumbnailUrl": "media/photo_7F012477_70EB_2FAD_41AB_0B9DFC45E85F_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7F012477_70EB_2FAD_41AB_0B9DFC45E85F.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 176.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93842FE6_8285_F33C_41C9_25C13D28CB5B",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93841FE6_8285_F33C_41BF_61ECF3223B63",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -161.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92BF5E32_8285_F514_41CF_F486F1988833",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92BF3E32_8285_F514_41AA_77A1D26EE64B",
 "automaticZoomSpeed": 10
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Bedroom 1",
 "id": "photo_7FA4421F_70F5_2B9C_41D2_85DFB97FFC68",
 "thumbnailUrl": "media/photo_7FA4421F_70F5_2B9C_41D2_85DFB97FFC68_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FA4421F_70F5_2B9C_41D2_85DFB97FFC68.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 36.97,
  "pitch": -17.04,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9363D_6DC0_599D_41D2_B107FAB55FA2",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -159.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93476121_8285_EF34_41D7_4E924385095F",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93477121_8285_EF34_41DF_7ED58E4A89A6",
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -97.78,
   "backwardYaw": 13.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C"
  }
 ],
 "label": "laundry",
 "id": "panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4",
 "overlays": [
  "this.overlay_1D28461D_0596_72D4_4122_8EE8B848FBC4"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "x": 218.95,
   "angle": -11.41,
   "class": "PanoramaMapLocation",
   "y": 369.05
  }
 ],
 "vfov": 180
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 870,
 "fieldOfViewOverlayRadiusScale": 0.1,
 "id": "map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
 "width": 423,
 "label": "pent house",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B.png",
    "width": 423,
    "height": 870,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_lq.png",
    "width": 178,
    "tags": "preload",
    "height": 367,
    "class": "ImageResourceLevel"
   }
  ]
 },
 "overlays": [
  "this.overlay_19CBB78D_0815_1E64_41A0_34C49A297019",
  "this.overlay_1980DBBD_0815_15A4_4183_59B5421EFE98",
  "this.overlay_1928017E_0817_12A4_41A3_5DC705284122",
  "this.overlay_1E7D0D67_0817_F2A4_418C_6B943FA4E7C7"
 ],
 "minimumZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "thumbnailUrl": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_t.png",
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1,
 "initialZoomFactor": 1
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Dog wash",
 "id": "photo_7F15C977_70EB_79AD_41DC_01B63358AD09",
 "thumbnailUrl": "media/photo_7F15C977_70EB_79AD_41DC_01B63358AD09_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7F15C977_70EB_79AD_41DC_01B63358AD09.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 77.7,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93751192_8285_EF14_41A3_BD99B24A9FC5",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9375E192_8285_EF14_41BB_3336AD5F5628",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -105.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93B08022_8285_ED34_4163_14667E3CFF2E",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93B16022_8285_ED34_41A7_5B38E95D1E38",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_0C187542_07F7_12DC_4185_7CD0138AD17C",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8D552D1F_8285_F70C_41C7_FD7A05FFF431",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 145.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92E3BEAD_8285_F50F_417F_FAF173C9B9C6",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_92E3AEAD_8285_F50F_41D1_50AC9BDCBC82",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -175.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_92300F56_8285_F31C_41D9_B61A436E1C3F",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_9230FF56_8285_F31C_41C4_5B0E3069038A",
 "automaticZoomSpeed": 10
},
{
 "id": "effect_61C6D587_70D5_696D_41D5_7C21DE33D250",
 "easing": "linear",
 "duration": 500,
 "class": "FadeOutEffect"
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -12.64,
   "backwardYaw": -154.4,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C"
  },
  {
   "yaw": -36.04,
   "backwardYaw": -102.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7"
  }
 ],
 "label": "bedroom 2",
 "id": "panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288",
 "overlays": [
  "this.overlay_1FF5D82F_05AE_3EF5_417C_5AA4139EBAEB",
  "this.overlay_1FB57D6A_05AE_517F_4190_80B74A171BDF"
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "hfov": 360,
 "partial": false,
 "thumbnailUrl": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_0CE38A31_07F7_16BD_4193_C403F3585A9B",
   "x": 124,
   "angle": -7.51,
   "class": "PanoramaMapLocation",
   "y": 686
  }
 ],
 "vfov": 180
},
{
 "id": "effect_7F4D85B0_70F7_28A4_41DA_235A5B52CEB1",
 "easing": "linear",
 "duration": 500,
 "class": "FadeOutEffect"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 814,
 "fieldOfViewOverlayRadiusScale": 0.1,
 "id": "map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8",
 "width": 331,
 "label": "second floor",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8.png",
    "width": 331,
    "height": 814,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_lq.png",
    "width": 163,
    "tags": "preload",
    "height": 401,
    "class": "ImageResourceLevel"
   }
  ]
 },
 "overlays": [
  "this.overlay_1F06B4C9_081D_33EC_41A0_EFD44CF12182",
  "this.overlay_1FFB1CF6_081F_13A4_418E_36DD62630B08",
  "this.overlay_1F69D5F5_081F_1DA4_41A1_16C805FCBCDD",
  "this.overlay_1F948EF5_081E_EFA4_41A2_7728C70587FF"
 ],
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "thumbnailUrl": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_t.png",
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Stack Laundry",
 "id": "photo_7FA9A1E0_70EB_68A3_41AF_15404496B3E0",
 "thumbnailUrl": "media/photo_7FA9A1E0_70EB_68A3_41AF_15404496B3E0_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FA9A1E0_70EB_68A3_41AF_15404496B3E0.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "height": 1080,
 "duration": 5000,
 "label": "Master bathroom",
 "id": "photo_7FA0BF78_70F5_39A4_41D4_E775AEBD0CA6",
 "thumbnailUrl": "media/photo_7FA0BF78_70F5_39A4_41D4_E775AEBD0CA6_t.png",
 "width": 1920,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7FA0BF78_70F5_39A4_41D4_E775AEBD0CA6.png",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -174.79,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_93FD406A_8285_ED34_41B7_96BAB0774E1E",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "camera_93FD206A_8285_ED34_41D0_3918CB8BCE84",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9E63C_6DC0_59A3_41A2_813BFBA2803B",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_19A9C854_05BE_3F54_4164_F939C1833B65_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 123.8,
  "pitch": -30.85,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_7AE9B63B_6DC0_59A5_41D5_4376B8B92313",
 "class": "PanoramaCamera",
 "manualRotationSpeed": 1000,
 "id": "panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_camera",
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "minHeight": 50,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "left": 0,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "minWidth": 100,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "shadow": false,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0B074894_07F5_1264_4191_8C3F0D97D974",
 "minHeight": 1,
 "children": [
  "this.MapViewer",
  "this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1"
 ],
 "scrollBarVisible": "rollOver",
 "right": "1.21%",
 "width": "12.183%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "2.07%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "height": "34.136%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container2022"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "hidden",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7C33F29E_70DD_289C_41CE_48B5812E5B61",
 "minHeight": 1,
 "children": [
  "this.Container_7DAC911C_70DB_E99C_41B9_A15142E519A6",
  "this.Container_7D7CC912_70D4_F967_41BA_7D92CC6CC7F6",
  "this.Container_7DA7EAA8_70D5_F8A3_41D4_D374BB9FF13E"
 ],
 "left": "0%",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "horizontal",
 "height": "10%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver"
},
{
 "id": "Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77",
 "minHeight": 1,
 "children": [
  "this.Container_7E61F6DC_70F5_28E3_41C3_6FFE491F3CF5"
 ],
 "scrollBarVisible": "rollOver",
 "left": "0%",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77, false, 0, this.effect_764B50D0_5098_666A_41CA_D502B62644A1, 'hideEffect', false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "paddingBottom": 0,
 "gap": 10,
 "visible": false,
 "overflow": "scroll",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "show": "this.ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_91BC2C68_8285_F534_41D9_5F5ACD5FE22A.set('selectedIndex', -1); }, this); this.playList_91BC2C68_8285_F534_41D9_5F5ACD5FE22A.set('selectedIndex', 0)",
 "id": "Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA",
 "minHeight": 1,
 "children": [
  "this.Container_7F7E7B33_70D5_59A4_41D8_A52D0089886C"
 ],
 "scrollBarVisible": "rollOver",
 "left": "0%",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "bottom": "0%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "paddingBottom": 0,
 "gap": 10,
 "visible": false,
 "overflow": "scroll",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "id": "IconButton_7D01D0B8_70F7_68A4_41AA_C8C58B453F68",
 "minHeight": 1,
 "width": 60,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "horizontalAlign": "center",
 "toolTipFontColor": "#606060",
 "minWidth": 1,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "toolTipPaddingLeft": 6,
 "height": 40,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "mode": "toggle",
 "iconURL": "skin/IconButton_7D01D0B8_70F7_68A4_41AA_C8C58B453F68.png",
 "backgroundOpacity": 0,
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "paddingTop": 0,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "propagateClick": false,
 "toolTipShadowHorizontalLength": 0,
 "class": "IconButton",
 "maxWidth": 128,
 "maxHeight": 128,
 "data": {
  "name": "IconButton1493"
 },
 "paddingBottom": 0,
 "toolTip": "Fullscreen",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipShadowVerticalLength": 0,
 "cursor": "hand",
 "transparencyActive": true
},
{
 "media": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D55ED21_8285_F734_41D4_EBA6AF6E6DFE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D55ED21_8285_F734_41D4_EBA6AF6E6DFE",
 "camera": "this.panorama_08E45B5C_059E_5154_417A_ED172912D8FA_camera"
},
{
 "media": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D557D22_8285_F734_41C8_AF5B6A47DBD1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D557D22_8285_F734_41C8_AF5B6A47DBD1",
 "camera": "this.panorama_117867BC_05BE_71DB_418D_23EE4304808C_camera"
},
{
 "media": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D54CD23_8285_F734_41DA_1D42568CF71C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D54CD23_8285_F734_41DA_1D42568CF71C",
 "camera": "this.panorama_11E0C688_0596_73BB_415F_C91017C010A0_camera"
},
{
 "media": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D541D23_8285_F734_41D3_0F2E2C4E5259, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D541D23_8285_F734_41D3_0F2E2C4E5259",
 "camera": "this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_camera"
},
{
 "media": "this.panorama_11FD5776_0596_3157_418C_8BCECD289C58",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D546D24_8285_F73C_41A2_F20FF0D251E4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D546D24_8285_F73C_41A2_F20FF0D251E4",
 "camera": "this.panorama_11FD5776_0596_3157_418C_8BCECD289C58_camera"
},
{
 "media": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D57BD24_8285_F73C_419D_9DE2ECF89A73, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D57BD24_8285_F73C_419D_9DE2ECF89A73",
 "camera": "this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_camera"
},
{
 "media": "this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D570D25_8285_F73C_41C4_4C0CCDF7D300, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D570D25_8285_F73C_41C4_4C0CCDF7D300",
 "camera": "this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_camera"
},
{
 "media": "this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D576D25_8285_F73C_41CD_788E11707F1B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D576D25_8285_F73C_41CD_788E11707F1B",
 "camera": "this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_camera"
},
{
 "media": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D56FD26_8285_F73C_41E0_14AE440D35DF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D56FD26_8285_F73C_41E0_14AE440D35DF",
 "camera": "this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_camera"
},
{
 "media": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D564D27_8285_F73C_41C4_780B21690AC4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D564D27_8285_F73C_41C4_780B21690AC4",
 "camera": "this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_camera"
},
{
 "media": "this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D69DD28_8285_F734_41E0_0F574E73B9E2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D69DD28_8285_F734_41E0_0F574E73B9E2",
 "camera": "this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_camera"
},
{
 "media": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D691D28_8285_F734_41D8_362359A029CF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D691D28_8285_F734_41D8_362359A029CF",
 "camera": "this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_camera"
},
{
 "media": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D696D29_8285_F734_41D1_5DB36FF1FC37, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D696D29_8285_F734_41D1_5DB36FF1FC37",
 "camera": "this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_camera"
},
{
 "media": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D683D2B_8285_F734_41A9_C0E4ABEF7E3B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 19, 20)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D683D2B_8285_F734_41A9_C0E4ABEF7E3B",
 "camera": "this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128_camera"
},
{
 "media": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D6BCD2B_8285_F734_41DF_54C8DF0158B1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D6BCD2B_8285_F734_41DF_54C8DF0158B1",
 "camera": "this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65_camera"
},
{
 "media": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D6B0D2C_8285_F70C_41D8_6E23D4B06B62, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D6B0D2C_8285_F70C_41D8_6E23D4B06B62",
 "camera": "this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_camera"
},
{
 "media": "this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D6B6D2C_8285_F70C_41DE_3C6F20F6DC94, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D6B6D2C_8285_F70C_41DE_3C6F20F6DC94",
 "camera": "this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_camera"
},
{
 "media": "this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8D6ACD2D_8285_F70C_41C7_58C206C6E16B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 24, 25)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8D6ACD2D_8285_F70C_41C7_58C206C6E16B",
 "camera": "this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_camera"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_92A89E01_8285_F4F4_41CE_665BDE07A3D4); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 5.04,
   "yaw": -72.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -67.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65708F8E_69AD_7D07_41C1_57F061BE6B42",
   "hfov": 5.04,
   "yaw": -72.92,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -67.51,
   "distance": 100
  }
 ],
 "id": "overlay_128E4014_05EE_CEAB_4196_D642E6E2BC25",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_925DBF8C_8285_F30C_41AE_624E58FA3264); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 3.03,
   "yaw": -48.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -63.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654ADF9E_69AD_7D07_41CB_083A3A0382AC",
   "hfov": 3.03,
   "yaw": -48.61,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -63.96,
   "distance": 100
  }
 ],
 "id": "overlay_1A31AAD1_05AB_F3AC_4192_6B5F364DC813",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEA863E_6DC0_599F_41D7_C2456B2785EA",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEA963E_6DC0_599F_41D0_1BFDB3916A05",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_930D707D_8285_ED0C_41DF_091FAAD69E2F",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9163D_6DC0_599D_41A0_F8817028942B",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9063D_6DC0_599D_41CE_8DC0964A9EB2",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEAB63E_6DC0_599F_41D3_BBE17E4ABB52",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93CEF034_8285_ED1C_41C9_E34FA3C2CCBD",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEAC63F_6DC0_599D_41BD_2347D29D77AB",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93571144_8285_EF7A_41DF_EA6B5692F5AC",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C, this.camera_93841FE6_8285_F33C_41BF_61ECF3223B63); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.16,
   "yaw": 18.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654DEF8E_69AD_7D07_418B_D14A4AC5CA77",
   "hfov": 4.16,
   "yaw": 18.81,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.52,
   "distance": 100
  }
 ],
 "id": "overlay_1C921E96_0596_33D7_4173_072F0C8D0EE0",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA, this.camera_9395DFFD_8285_F30C_419B_D538E718A628); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bathroom 3"
  }
 ],
 "maps": [
  {
   "hfov": 4.53,
   "yaw": -166.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654C3F8E_69AD_7D07_41C4_898983491656",
   "hfov": 4.53,
   "yaw": -166.07,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.17,
   "distance": 100
  }
 ],
 "id": "overlay_1C648E38_05AA_52DB_418D_BD962D1864CC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEAE63E_6DC0_599F_41AB_626F2E59BB56",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9663D_6DC0_599D_41D3_DB4BAD0C3A58",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92834DB4_8285_F71C_41CD_F7C974C8037F",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_922B1F2D_8285_F30C_41C1_EC1972B14344); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 3.1,
   "yaw": -3.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654BAF9E_69AD_7D07_41D1_6226A0449FF6",
   "hfov": 3.1,
   "yaw": -3.03,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.87,
   "distance": 100
  }
 ],
 "id": "overlay_1B446937_05AE_3ED5_4192_5410C620FA37",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3, this.camera_92257F40_8285_F374_41DD_7E36FB5EFD0C); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bathroom 4"
  }
 ],
 "maps": [
  {
   "hfov": 3.78,
   "yaw": 78.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654A2F9E_69AD_7D07_41CD_84B5DF044D91",
   "hfov": 3.78,
   "yaw": 78.53,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.73,
   "distance": 100
  }
 ],
 "id": "overlay_1AE4B288_05AE_33BC_4168_C1580D20328E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9395EFFE_8285_F30C_41E0_14D264826789",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7B0BA612_6DC0_5967_41D5_E4543B0A7A9B",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92A8BE01_8285_F4F4_41D5_8158A439C657",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9963C_6DC0_59A3_417F_552B22AF25C2",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_924EBF6E_8285_F30C_41CF_3FF87C366BEB",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92FF9EC5_8285_F57C_41DE_340C3D1E97BE",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_926A1FA6_8285_F33C_416B_3598D2F8D7B4",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_93CED034_8285_ED1C_41C5_EFD890290692); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.2,
   "yaw": 149.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654C9F9E_69AD_7D07_41D6_063F29A2812F",
   "hfov": 4.2,
   "yaw": 149.82,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.75,
   "distance": 100
  }
 ],
 "id": "overlay_148CD8B5_196B_5B4E_4187_67E480AF5A48",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 4"
  }
 ],
 "maps": [
  {
   "hfov": 4.17,
   "yaw": 9.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654CFF9E_69AD_7D07_41D4_A0F38C305E11",
   "hfov": 4.17,
   "yaw": 9.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.61,
   "distance": 100
  }
 ],
 "id": "overlay_148C98B5_196B_5B4E_41A6_991EBBD0D766",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Gym"
  }
 ],
 "maps": [
  {
   "hfov": 3.41,
   "yaw": 42.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_2_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -37.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654B5F9E_69AD_7D07_41C8_8708AEB187D1",
   "hfov": 3.41,
   "yaw": 42.7,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -37.85,
   "distance": 100
  }
 ],
 "id": "overlay_148C68B5_196B_5B4E_41B3_D74DD2903FF9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9209CEE0_8285_F534_41DA_04802B683D5C",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_103515CB_05AA_71BD_4184_150FCFB3FE01, this.camera_16226466_05AA_3774_4189_1E2CF4A23533)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Powder Room"
  }
 ],
 "maps": [
  {
   "hfov": 8.16,
   "yaw": -9.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -62.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6577CF8E_69AD_7D07_41BD_501B3BAD3D4A",
   "hfov": 8.16,
   "yaw": -9.31,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -62.52,
   "distance": 100
  }
 ],
 "id": "overlay_11B1828E_05AE_53B7_4196_6DE148B6369E",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01b"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11E0C688_0596_73BB_415F_C91017C010A0, this.camera_9230FF56_8285_F31C_41C4_5B0E3069038A); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Stairs"
  }
 ],
 "maps": [
  {
   "hfov": 6.66,
   "yaw": 88.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_1_HS_2_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -28.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65761F8E_69AD_7D07_415C_B0F2B3628D99",
   "hfov": 6.66,
   "yaw": 88.89,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -28.77,
   "distance": 100
  }
 ],
 "id": "overlay_11DCF7DF_05AA_5154_4165_B58D7FDE40F3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MapViewer",
 "minHeight": 1,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "left": "0%",
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "minWidth": 1,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "91.067%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": "0%",
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "shadow": false,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "MapViewer"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_92D67E93_8285_F514_41A5_47B588CA198F); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.04,
   "yaw": 63.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DC75FEA_69B3_BD0F_419B_A0AD3BCF8C11",
   "hfov": 4.04,
   "yaw": 63.91,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.23,
   "distance": 100
  }
 ],
 "id": "overlay_7BD812AB_69B7_670D_41D0_4D8220600A6D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9E640_6DC0_59E3_41C7_FF2F8F53CB24",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92DC9E7B_8285_F514_41C5_BD41F68686B0",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEAA63E_6DC0_599F_41D3_3AB2204DC76D",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_921F0F18_8285_F314_41D3_4764991B547C",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92899D83_8285_F7F4_41B4_C63A210CFA29",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9082D1B8_8285_EF15_41DD_D160A7C8738E",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_92A21E1A_8285_F514_41D6_CCF361B85E8C); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Second Floor"
  }
 ],
 "maps": [
  {
   "hfov": 4.51,
   "yaw": 93.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_0_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -48.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DC9BFE8_69B3_BD0B_41D5_270927787F5A",
   "hfov": 4.51,
   "yaw": 93.19,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -48.59,
   "distance": 100
  }
 ],
 "id": "overlay_7ACB2B9E_69B4_A507_4199_24DB5AD67BA9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4, this.camera_92C2FE62_8285_F534_41D4_1AAAAFE32DDC); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Laundry"
  }
 ],
 "maps": [
  {
   "hfov": 4.34,
   "yaw": 13.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -47.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DCA2FE8_69B3_BD0B_41BF_9D7BE7A2C9B5",
   "hfov": 4.34,
   "yaw": 13.87,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -47.42,
   "distance": 100
  }
 ],
 "id": "overlay_7ACB3B9F_69B4_A505_41C4_72C5E496BA8B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C, this.camera_92BF3E32_8285_F514_41AA_77A1D26EE64B); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 3"
  }
 ],
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -3.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_2_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -25.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DCA6FE8_69B3_BD0B_419C_58BF9EBF622B",
   "hfov": 4.79,
   "yaw": -3.22,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.26,
   "distance": 100
  }
 ],
 "id": "overlay_7ACB0B9F_69B4_A505_41D0_A5233DA25630",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288, this.camera_92C9EE4A_8285_F574_41B5_25753BEB3470); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 2"
  }
 ],
 "maps": [
  {
   "hfov": 4.03,
   "yaw": -154.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_3_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DCA8FE8_69B3_BD0B_41C8_20557E264785",
   "hfov": 4.03,
   "yaw": -154.4,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.53,
   "distance": 100
  }
 ],
 "id": "overlay_7AC8EB9F_69B4_A505_41D4_5DA32DE0492E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_931B6090_8285_ED14_41D7_CC9486681A7B",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92A22E1B_8285_F514_41BA_EFBCD036664C",
 "restartMovementOnUserInteraction": false
},
{
 "items": [
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_0",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.30",
     "class": "PhotoCameraPosition",
     "y": "0.33"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_1",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.34",
     "class": "PhotoCameraPosition",
     "y": "0.74"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_2",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.27",
     "class": "PhotoCameraPosition",
     "y": "0.26"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_3",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.66",
     "class": "PhotoCameraPosition",
     "y": "0.30"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_4",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.72",
     "class": "PhotoCameraPosition",
     "y": "0.46"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_60E200CE_70F5_28FC_41D6_35132B7AB833_5",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.27",
     "class": "PhotoCameraPosition",
     "y": "0.57"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7F3D4A5F_70F5_3B9C_41D4_0A025D794AEB",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.62",
     "class": "PhotoCameraPosition",
     "y": "0.64"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_60C81D41_70F5_39E4_41DA_17B358FA3401",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.56",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FA0BF78_70F5_39A4_41D4_E775AEBD0CA6",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.39",
     "class": "PhotoCameraPosition",
     "y": "0.41"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FA4421F_70F5_2B9C_41D2_85DFB97FFC68",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.72",
     "class": "PhotoCameraPosition",
     "y": "0.52"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB6D44E_70F5_2FFC_41D5_00C04AEEDE7B",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.46",
     "class": "PhotoCameraPosition",
     "y": "0.33"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7F552131_70EB_29A5_41D7_21DB2E0C552E",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.43",
     "class": "PhotoCameraPosition",
     "y": "0.59"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7F012477_70EB_2FAD_41AB_0B9DFC45E85F",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.52",
     "class": "PhotoCameraPosition",
     "y": "0.38"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB23732_70EB_29A4_41CD_B60AF22458A1",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.56",
     "class": "PhotoCameraPosition",
     "y": "0.59"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FBBE9EF_70EB_38BC_41C6_D344A4B82BE2",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.48",
     "class": "PhotoCameraPosition",
     "y": "0.27"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB63CAA_70EB_38A7_41C8_F71AD5D9175A",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.58",
     "class": "PhotoCameraPosition",
     "y": "0.29"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7F7C670A_70EB_6967_41D6_C15B5EA68E3D",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.58",
     "class": "PhotoCameraPosition",
     "y": "0.64"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7F15C977_70EB_79AD_41DC_01B63358AD09",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.45",
     "class": "PhotoCameraPosition",
     "y": "0.29"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB3EC3E_70EB_7F9C_418A_5C637889DABE",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.35",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB60F46_70EB_79EF_41C9_A3F0AC41F9CE",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.73",
     "class": "PhotoCameraPosition",
     "y": "0.28"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FA9A1E0_70EB_68A3_41AF_15404496B3E0",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.62",
     "class": "PhotoCameraPosition",
     "y": "0.72"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.photo_7FB114B2_70EB_68A7_41C5_788F60F75825",
   "camera": {
    "initialPosition": {
     "zoomFactor": 1,
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "duration": 5000,
    "targetPosition": {
     "zoomFactor": 1.1,
     "x": "0.75",
     "class": "PhotoCameraPosition",
     "y": "0.28"
    },
    "scaleMode": "fit_outside",
    "easing": "linear",
    "class": "MovementPhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_60E200CE_70F5_28FC_41D6_35132B7AB833_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8, this.camera_930D407D_8285_ED0C_41D5_E277FBF59BC4); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Master Bedroom"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "yaw": -45.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -38.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654D1F8E_69AD_7D07_41BE_096089EAA4B0",
   "hfov": 4.76,
   "yaw": -45.14,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -38.46,
   "distance": 100
  }
 ],
 "id": "overlay_12314188_0596_31BC_4124_3B553515CB40",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9205BEFD_8285_F50C_4145_6C3AB9A5D43A",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_92DC8E7B_8285_F514_41D7_D7F499ECBB58); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -31.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -26.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65702F8E_69AD_7D07_418C_747D76B067BA",
   "hfov": 4.14,
   "yaw": -31.97,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -26.63,
   "distance": 100
  }
 ],
 "id": "overlay_12CA7D39_05EA_56DD_418D_CAF2F783E623",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "map": {
  "width": 15,
  "x": 239.35,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_0_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 722.9,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Entrance"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 239.15,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 722.7,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_0.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_189B0756_0835_1EE4_419D_46841480DBD7",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 232,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_1_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 540.95,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Stairs"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 231.8,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 540.75,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_1.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_18254BCE_0833_35E4_418F_1CD6B52BCDB2",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 100.25,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_2_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 272.3,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Living Room"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 100.05,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 272.1,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_2.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1EE72A9B_080D_166C_4182_BEEA789D1AAA",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 131.65,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_3_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 424.25,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Kitchen"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 131.45,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 424.05,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_3.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1929BBBE_080D_35A4_4176_DB6FD1E5EB84",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 239.45,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_4_map.gif",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 626.95,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 239.25,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 626.7,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0BE477B2_07F7_1DBC_415F_C9D53F3A5B4A_HS_4.png",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1CC537E4_080D_1DA4_4144_9B94610F9BA0",
 "data": {
  "label": "Image"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11E0C688_0596_73BB_415F_C91017C010A0, this.camera_93A3B010_8285_ED14_41C5_4B49EC34020E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.91,
   "yaw": -46.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65759F8E_69AD_7D07_41D6_C43224F18DF6",
   "hfov": 4.91,
   "yaw": -46.39,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.77,
   "distance": 100
  }
 ],
 "id": "overlay_11C33AED_0599_F375_417A_E2F31850BEC5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11FD5776_0596_3157_418C_8BCECD289C58, this.camera_93B16022_8285_ED34_41A7_5B38E95D1E38); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Living Room"
  }
 ],
 "maps": [
  {
   "hfov": 9.2,
   "yaw": 164.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6575EF8E_69AD_7D07_4175_CBEAD5C8DAFB",
   "hfov": 9.2,
   "yaw": 164.85,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.78,
   "distance": 100
  }
 ],
 "id": "overlay_117D15C7_059B_D1B5_4194_95F765F92860",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93DEB046_8285_ED7C_4189_811A0328F1A5",
 "restartMovementOnUserInteraction": false
},
{
 "paddingLeft": 0,
 "id": "IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554",
 "minHeight": 70,
 "width": "10%",
 "horizontalAlign": "center",
 "minWidth": 70,
 "pressedIconURL": "skin/IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554_pressed.png",
 "verticalAlign": "middle",
 "height": "10%",
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554.png",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "IconButton",
 "maxWidth": 150,
 "maxHeight": 150,
 "data": {
  "name": "IconButton right arrow"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "transparencyActive": true
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615",
 "minHeight": 1,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "left": 0,
 "playbackBarRight": 0,
 "right": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "minWidth": 1,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "shadow": false,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028",
 "minHeight": 70,
 "width": "10%",
 "horizontalAlign": "center",
 "minWidth": 70,
 "pressedIconURL": "skin/IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028_pressed.png",
 "verticalAlign": "middle",
 "height": "10%",
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028.png",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "IconButton",
 "maxWidth": 150,
 "maxHeight": 150,
 "data": {
  "name": "IconButton left arrow"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "transparencyActive": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9863C_6DC0_59A3_41BE_90C24712FC5C",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92E98E93_8285_F514_41D5_8D04E6756EBE",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1); this.setComponentVisibility(this.Container_0B074894_07F5_1264_4191_8C3F0D97D974, true, 0, this.effect_7002FB9E_6E40_4E9E_41D4_07F5B09341D3, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Click to Enter"
  }
 ],
 "maps": [
  {
   "hfov": 1.08,
   "yaw": 2.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65785F7F_69AD_7D05_41D6_2D984AF236E7",
   "hfov": 1.08,
   "yaw": 2.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.5,
   "distance": 100
  }
 ],
 "id": "overlay_2CC330B8_201A_9CD9_41BA_2CB7CCDAA232",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Powder Room"
  }
 ],
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 77.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0_HS_2_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -23.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 01b Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7BE0E809_69B7_630D_41B7_D988CD611952",
   "hfov": 3.55,
   "yaw": 77.34,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.15,
   "distance": 100
  }
 ],
 "id": "overlay_11B2A09C_05AA_4FDB_4182_3FE59AEA52A2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 3.53,
   "yaw": 91.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0_HS_3_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -11.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7BE1280A_69B7_630F_41CF_D6D44700071D",
   "hfov": 3.53,
   "yaw": 91.26,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -11.7,
   "distance": 100
  }
 ],
 "id": "overlay_6779FC34_69B5_631B_41D6_031408787370",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_93ECB058_8285_ED14_419B_7AB46A0DCFF1); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 3.49,
   "yaw": -87.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -33.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7DC86FE7_69B3_BD05_41CE_2BF7591932AD",
   "hfov": 3.49,
   "yaw": -87.22,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.08,
   "distance": 100
  }
 ],
 "id": "overlay_7AE30D75_69B5_FD05_41C5_7EF116912C29",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_922B2F2D_8285_F30C_419E_F224E3CF151D",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93A3D010_8285_ED14_41DD_8E2D3713886D",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 10.11,
   "yaw": -174.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_1_HS_3_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -45.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65770F8E_69AD_7D07_41CF_566DCEDAFAC8",
   "hfov": 10.11,
   "yaw": -174.46,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -45.58,
   "distance": 100
  }
 ],
 "id": "overlay_11878858_05BA_7F5B_418A_7C8E3755BE23",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_932B50B6_8285_ED1C_41D0_7C5C13725DAD",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93ECA059_8285_ED14_41D7_887310CA8818",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288, this.camera_921FFF18_8285_F314_41DB_CC599CAFB6E3); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 2"
  }
 ],
 "maps": [
  {
   "hfov": 3.5,
   "yaw": -102.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -61.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654C3F9E_69AD_7D07_41CD_47EF478D5BE6",
   "hfov": 3.5,
   "yaw": -102.3,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -61.72,
   "distance": 100
  }
 ],
 "id": "overlay_1F2C1718_05AA_32DB_4181_6E4AC5C51666",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_934940FE_8285_ED0C_4196_77CA58F06254",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9299CDCE_8285_F70C_41D0_3D146CD27071",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92C90E4A_8285_F574_41C6_498B6CFC40E3",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92796FC1_8285_F374_41D1_48133E22191D",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9263D_6DC0_599D_41D0_713FA69EE07E",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AEAD63F_6DC0_599D_41C3_03DFC3B79679",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_933880D6_8285_ED1D_41A1_0DB94ABEBD53",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92C20E62_8285_F535_41C4_776905B0A453",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_928D2D9C_8285_F70D_41AD_A4FECB539AB3",
 "restartMovementOnUserInteraction": false
},
{
 "paddingLeft": 0,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "id": "IconButton_7D01D881_70ED_E765_41D9_2D20215E503C",
 "minHeight": 1,
 "width": 60,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "horizontalAlign": "center",
 "toolTipFontColor": "#606060",
 "minWidth": 1,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "toolTipPaddingLeft": 6,
 "height": 60,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7D01D881_70ED_E765_41D9_2D20215E503C.png",
 "backgroundOpacity": 0,
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "paddingTop": 0,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "propagateClick": false,
 "toolTipShadowHorizontalLength": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "maxHeight": 60,
 "data": {
  "name": "IconButton8351"
 },
 "paddingBottom": 0,
 "toolTip": "Activate VR",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipShadowVerticalLength": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9463E_6DC0_599F_41A3_392035B19F92",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C, this.camera_93DE8046_8285_ED7C_419B_269F16B91D57); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 3"
  }
 ],
 "maps": [
  {
   "hfov": 3.05,
   "yaw": -85.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -58.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654B6F8E_69AD_7D07_41CC_78D8BF670ADE",
   "hfov": 3.05,
   "yaw": -85.02,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -58.26,
   "distance": 100
  }
 ],
 "id": "overlay_1C3E2534_05AA_56D4_418D_A28AD2CA4722",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9A63F_6DC0_599D_41D6_B4E7012FD1CF",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9763D_6DC0_599D_41D2_4812504D63BC",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_93FD206A_8285_ED34_41D0_3918CB8BCE84); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 5.93,
   "yaw": -172.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -35.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654A9F9E_69AD_7D07_41C6_26B772018450",
   "hfov": 5.93,
   "yaw": -172.09,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -35.34,
   "distance": 100
  }
 ],
 "id": "overlay_1A9B47F0_05A9_F16B_4185_29FC59BC6F7D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE98640_6DC0_59E3_41D4_D52D046FCA93",
 "restartMovementOnUserInteraction": false
},
{
 "map": {
  "width": 15.1,
  "x": 221.05,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_0_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 483.95,
  "offsetY": 0,
  "height": 19.32,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 220.9,
  "height": 19.32,
  "class": "HotspotMapOverlayImage",
  "y": 483.8,
  "width": 15.1,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_0.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_0960B793_07F3_1E7C_417B_5E63700B3B8C",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 96.2,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_1_map.gif",
     "width": 15,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 603.1,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Gym"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 96.05,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 602.95,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_1.png",
     "width": 15,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_186957A1_081F_3E5C_4192_138AB44B8FD0",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 144.55,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_2_map.gif",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 240.6,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Living Room"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 144.4,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 240.45,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_2.png",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1A4C58C5_081D_13E4_4192_61BE78B9A121",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 230.1,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_3_map.gif",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 670.45,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bedroom 4"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 229.95,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 670.3,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_3.png",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1912B07D_0813_12A4_418A_973A5DA56B29",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 157.6,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_4_map.gif",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 405.6,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bathroom 4"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 157.45,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 405.45,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0C187542_07F7_12DC_4185_7CD0138AD17C_HS_4.png",
     "width": 14,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1BC3BA6D_0835_36A4_41A2_F757E23264A4",
 "data": {
  "label": "Image"
 }
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_929E5DE6_8285_F73C_41C3_FFD1E0873A65",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C, this.camera_933890D6_8285_ED1D_41D3_EBE1F2A2DD91); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Penthouse"
  }
 ],
 "maps": [
  {
   "hfov": 11.22,
   "yaw": 1.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_12_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -19.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_487B16D6_69F3_6F07_41D9_6F4932C22568",
   "hfov": 11.22,
   "yaw": 1.8,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.99,
   "distance": 100
  }
 ],
 "id": "overlay_7F12BC0E_69D5_A307_41D2_19E6E7150CD2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11E0C688_0596_73BB_415F_C91017C010A0, this.camera_9357E144_8285_EF7D_41E0_4FED583189CC); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "First Floor"
  }
 ],
 "maps": [
  {
   "hfov": 9.56,
   "yaw": -34.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_13_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_487B66D6_69F3_6F07_41D9_DACF2A0F69BA",
   "hfov": 9.56,
   "yaw": -34.64,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.63,
   "distance": 50
  }
 ],
 "id": "overlay_7363EF5D_69EC_FD05_41A7_CEAD85D0038E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77, this.camera_934900FE_8285_ED0C_41C2_5503CF0E069B); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 1"
  }
 ],
 "maps": [
  {
   "hfov": 7.53,
   "yaw": -49.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_14_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4864B6D6_69F3_6F07_41C3_E5F1FCFE4E4D",
   "hfov": 7.53,
   "yaw": -49.6,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -22.7,
   "distance": 100
  }
 ],
 "id": "overlay_7E4BD44B_69EF_A30D_41C6_A9EAA150E0E3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B, this.camera_931B4090_8285_ED14_41DE_73FFF443F540); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Living Room"
  }
 ],
 "maps": [
  {
   "hfov": 6.87,
   "yaw": 86.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_15_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_486406D6_69F3_6F07_41AA_0E9484A8F132",
   "hfov": 6.87,
   "yaw": 86.01,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.57,
   "distance": 100
  }
 ],
 "id": "overlay_7E790651_69EC_AF1D_4193_F06AFEEAE876",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5, this.camera_932B30B6_8285_ED1C_419F_E71CCF20D917); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bathroom 1"
  }
 ],
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -120,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_16_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -43.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_486466D6_69F3_6F07_41CF_4D5755F5F86C",
   "hfov": 4.14,
   "yaw": -120,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -43.13,
   "distance": 100
  }
 ],
 "id": "overlay_7E39EAAB_69F3_A70D_41CD_11B9F0BB1A4E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8, this.camera_93477121_8285_EF34_41DF_7ED58E4A89A6); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Master Bedroom"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "yaw": -85.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_17_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4865B6D6_69F3_6F07_41C4_426A77F8622C",
   "hfov": 4.76,
   "yaw": -85.74,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.94,
   "distance": 100
  }
 ],
 "id": "overlay_71862B5B_69F4_A50D_41D2_9E562B909E9D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9963F_6DC0_599D_41D0_3CCB05BFBD22",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_925DEF8C_8285_F30C_41B5_820774AB6A32",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_8D73BD6E_8285_F70C_41CA_9B34F2F1C643",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15, this.camera_92898D83_8285_F7F4_41C0_C84B712D06AB); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bedroom 4"
  }
 ],
 "maps": [
  {
   "hfov": 2.66,
   "yaw": 5.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_6_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -15.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_705EA2BC_69DF_E70B_41C5_BF9B39AAC720",
   "hfov": 2.66,
   "yaw": 5.21,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.28,
   "distance": 100
  }
 ],
 "id": "overlay_7AE601A8_69AD_E50B_41A3_C0A2E8577A4F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65, this.camera_92833DB4_8285_F71C_41C6_5295F26D7EA1); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Gym"
  }
 ],
 "maps": [
  {
   "hfov": 3.51,
   "yaw": 19.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_7_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -18.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4879D6D5_69F3_6F05_4195_59B5153E6E0E",
   "hfov": 3.51,
   "yaw": 19.72,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.92,
   "distance": 100
  }
 ],
 "id": "overlay_7A7ADEB9_69D3_7F0D_41D0_E2FAD822C956",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E, this.camera_8D739D6E_8285_F70C_41D0_FA32A7DF668B); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Stack Laundry"
  }
 ],
 "maps": [
  {
   "hfov": 3.37,
   "yaw": 26.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_8_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_487926D5_69F3_6F05_41A8_CD26FE16FF7E",
   "hfov": 3.37,
   "yaw": 26.44,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.93,
   "distance": 100
  }
 ],
 "id": "overlay_7A312728_69D4_ED0A_41B2_44ADF74C8DC2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE, this.camera_9299BDCE_8285_F70C_41B3_37F40711D023); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bathroom 4"
  }
 ],
 "maps": [
  {
   "hfov": 3,
   "yaw": 141.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_9_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_705C72BC_69DF_E70B_41D9_50BC684F06FC",
   "hfov": 3,
   "yaw": 141.14,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.93,
   "distance": 100
  }
 ],
 "id": "overlay_7DCF13A2_69D7_E53F_41D0_A5E3A6498A01",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E, this.camera_928D1D9B_8285_F70A_41DD_835E8ECE2953); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Recreation Room"
  }
 ],
 "maps": [
  {
   "hfov": 3.47,
   "yaw": 173.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_10_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -10.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_487AF6D5_69F3_6F05_41CC_64D939452872",
   "hfov": 3.47,
   "yaw": 173.91,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -10.32,
   "distance": 100
  }
 ],
 "id": "overlay_7D627459_69D5_A30D_41D6_5FAB783EE993",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_11E0C688_0596_73BB_415F_C91017C010A0, this.camera_929E4DE6_8285_F73C_41D8_ED5D460391A8); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "First Floor"
  }
 ],
 "maps": [
  {
   "hfov": 5.82,
   "yaw": 103.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_11_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_705D52BD_69DF_E705_41BB_061B8914A5F9",
   "hfov": 5.82,
   "yaw": 103.98,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.37,
   "distance": 100
  }
 ],
 "id": "overlay_7D3B8A60_69D3_673B_41DA_5A0B1DCF836D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9389AFD4_8285_F31D_41A6_BD60AFE2E95A",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9C63C_6DC0_59A3_4189_1CF05769C1AA",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92248F40_8285_F374_41CA_EB76B9C502B1",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D, this.camera_924E9F6E_8285_F30C_41CA_CE034B7DDFC3); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Kitchen"
  }
 ],
 "maps": [
  {
   "hfov": 4.96,
   "yaw": 74.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65725F8E_69AD_7D07_41C2_E866BB1DB3E4",
   "hfov": 4.96,
   "yaw": 74.11,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.81,
   "distance": 100
  }
 ],
 "id": "overlay_117D9731_0596_52ED_418F_D2ECD5C47861",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.94,
   "yaw": 39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -17.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65733F8E_69AD_7D07_41B9_88ED78AA584E",
   "hfov": 4.94,
   "yaw": 39,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.11,
   "distance": 100
  }
 ],
 "id": "overlay_1139C0A7_05EA_4FF5_418E_274A48AD89BE",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_9365616E_8285_EF0D_41D0_CB8FF121F362",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9F63C_6DC0_59A3_41D1_181BAC11FD02",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_92795FC1_8285_F374_41CF_F0D606666EED); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.24,
   "yaw": 20.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6570CF8E_69AD_7D07_41CA_EB04BE176874",
   "hfov": 4.24,
   "yaw": 20.07,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.05,
   "distance": 100
  }
 ],
 "id": "overlay_124CC820_05EA_DEEB_4176_6EB6DC3EA824",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47, this.camera_93899FD3_8285_F31B_41DE_7B22946E5FE7); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Master Bathroom"
  }
 ],
 "maps": [
  {
   "hfov": 5.01,
   "yaw": -132.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654F2F8E_69AD_7D07_41CD_85622C0D64FD",
   "hfov": 5.01,
   "yaw": -132.55,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.89,
   "distance": 100
  }
 ],
 "id": "overlay_126B48FF_05EB_DF55_4186_D80CC6326872",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19A9C854_05BE_3F54_4164_F939C1833B65, this.camera_9082B1B8_8285_EF15_41BA_C90E4320DF77); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Gym"
  }
 ],
 "maps": [
  {
   "hfov": 2.93,
   "yaw": -66.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -66.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65498F9E_69AD_7D07_41D5_4A94E5B4E997",
   "hfov": 2.93,
   "yaw": -66.12,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -66.56,
   "distance": 100
  }
 ],
 "id": "overlay_24CBA8D5_059E_3F55_418F_981AF876A28C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1120540D_059A_56B5_4175_4B4CCB7A408D, this.camera_92059EFD_8285_F50C_41D1_571625E04272); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Kitchen"
  }
 ],
 "maps": [
  {
   "hfov": 6.71,
   "yaw": 121.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -24.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65766F8E_69AD_7D07_419B_8236262E831A",
   "hfov": 6.71,
   "yaw": 121.97,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -24.32,
   "distance": 100
  }
 ],
 "id": "overlay_11F6184E_0596_7EB7_4169_1FC35FF4371D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A, this.camera_92E3AEAD_8285_F50F_41D1_50AC9BDCBC82); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Second Floor"
  }
 ],
 "maps": [
  {
   "hfov": 10.69,
   "yaw": 92.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -23.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04b"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6576BF8E_69AD_7D07_41C5_48B46C0C8F38",
   "hfov": 10.69,
   "yaw": 92.94,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.59,
   "distance": 100
  }
 ],
 "id": "overlay_11451A3F_059A_32D5_4189_0144E940B9B2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_117867BC_05BE_71DB_418D_23EE4304808C, this.camera_9209AEE0_8285_F534_41CC_BC60410434D6); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 6.33,
   "yaw": 4.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_2_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_6576FF8E_69AD_7D07_41A6_075D7B1E958B",
   "hfov": 6.33,
   "yaw": 4.2,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.98,
   "distance": 100
  }
 ],
 "id": "overlay_10FF66FF_05EA_D355_4142_90C306570D1B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7894145C_69BF_A30B_41D7_CF0F58331128, this.camera_92FC6EC5_8285_F57C_41D1_9F9A47C2E22E); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Basement"
  }
 ],
 "maps": [
  {
   "hfov": 5.28,
   "yaw": 54.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_3_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -43.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_65754F8E_69AD_7D07_41D1_08BA7EBCF97B",
   "hfov": 5.28,
   "yaw": 54.3,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -43.27,
   "distance": 50
  }
 ],
 "id": "overlay_10684630_05E9_D2EB_4194_B93C587D1A06",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93842FE6_8285_F33C_41C9_25C13D28CB5B",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92BF5E32_8285_F514_41CF_F486F1988833",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9363D_6DC0_599D_41D2_B107FAB55FA2",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93476121_8285_EF34_41D7_4E924385095F",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C, this.camera_926AFFA6_8285_F33C_41D4_3AF70A9C1488); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby "
  }
 ],
 "maps": [
  {
   "hfov": 4.11,
   "yaw": -97.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -44.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654D7F8E_69AD_7D07_41C2_D11E2FA243F7",
   "hfov": 4.11,
   "yaw": -97.78,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -44.98,
   "distance": 100
  }
 ],
 "id": "overlay_1D28461D_0596_72D4_4122_8EE8B848FBC4",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "map": {
  "width": 15,
  "x": 207.75,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_0_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 172.8,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bedroom 3"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 207.5,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 172.6,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_0.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_19CBB78D_0815_1E64_41A0_34C49A297019",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 147.75,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_1_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 464.75,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 147.5,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 464.55,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_1.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1980DBBD_0815_15A4_4183_59B5421EFE98",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 211.75,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_2_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 359.75,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Laundry"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 211.45,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 359.55,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_2.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1928017E_0817_12A4_41A3_5DC705284122",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 116.7,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_3_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 676.75,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bedroom 2"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 116.5,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 676.5,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE38A31_07F7_16BD_4193_C403F3585A9B_HS_3.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1E7D0D67_0817_F2A4_418C_6B943FA4E7C7",
 "data": {
  "label": "Image"
 }
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93751192_8285_EF14_41A3_BD99B24A9FC5",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93B08022_8285_ED34_4163_14667E3CFF2E",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92E3BEAD_8285_F50F_417F_FAF173C9B9C6",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_92300F56_8285_F31C_41D9_B61A436E1C3F",
 "restartMovementOnUserInteraction": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C, this.camera_9365516E_8285_EF0D_41AE_E3AAA12F6E72); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "maps": [
  {
   "hfov": 4.56,
   "yaw": -12.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_1_HS_0_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -25.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654CAF8E_69AD_7D07_41C8_DDC4CB706610",
   "hfov": 4.56,
   "yaw": -12.64,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.7,
   "distance": 100
  }
 ],
 "id": "overlay_1FF5D82F_05AE_3EF5_417C_5AA4139EBAEB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EFD1E68_05AE_537B_4196_B581C49310D7, this.camera_9375E192_8285_EF14_41BB_3336AD5F5628); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Bathroom 2"
  }
 ],
 "maps": [
  {
   "hfov": 4.09,
   "yaw": -36.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_1_HS_1_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -23.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_654B0F8E_69AD_7D07_41CE_46FD6D930445",
   "hfov": 4.09,
   "yaw": -36.04,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.78,
   "distance": 100
  }
 ],
 "id": "overlay_1FB57D6A_05AE_517F_4190_80B74A171BDF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "map": {
  "width": 15,
  "x": 109.76,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_0_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 472.73,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Lobby"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 109.35,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 472.35,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_0.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1F06B4C9_081D_33EC_41A0_EFD44CF12182",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 236.35,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_1_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 378.85,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bedroom 1"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 235.95,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 378.45,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_1.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1FFB1CF6_081F_13A4_418E_36DD62630B08",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 131.84,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_2_map.gif",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 568.89,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Living Room"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 131.4,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 568.5,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_2.png",
     "width": 14,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1F69D5F5_081F_1DA4_41A1_16C805FCBCDD",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 15,
  "x": 151.73,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_3_map.gif",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 152.21,
  "offsetY": 0,
  "height": 19,
  "class": "HotspotMapOverlayMap"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Master Bedroom"
  }
 ],
 "rollOverDisplay": false,
 "image": {
  "x": 151.3,
  "height": 19,
  "class": "HotspotMapOverlayImage",
  "y": 151.85,
  "width": 15,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_0CE0ACB0_07F7_13BC_419A_0EAB38A915D8_HS_3.png",
     "width": 15,
     "height": 19,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_1F948EF5_081E_EFA4_41A2_7728C70587FF",
 "data": {
  "label": "Image"
 }
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_93FD406A_8285_ED34_41B7_96BAB0774E1E",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9E63C_6DC0_59A3_41A2_813BFBA2803B",
 "restartMovementOnUserInteraction": false
},
{
 "class": "PanoramaCameraSequence",
 "movements": [
  {
   "yawDelta": 79600,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement",
   "duration": 10000000
  }
 ],
 "id": "sequence_7AE9B63B_6DC0_59A5_41D5_4376B8B92313",
 "restartMovementOnUserInteraction": false
},
{
 "popUpBackgroundColor": "#FFFFFF",
 "id": "DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1",
 "minHeight": 20,
 "popUpBackgroundOpacity": 0.9,
 "left": "0%",
 "width": "100%",
 "fontFamily": "Arial",
 "arrowColor": "#FFFFFF",
 "minWidth": 200,
 "popUpShadow": false,
 "popUpFontColor": "#000000",
 "popUpShadowBlurRadius": 6,
 "popUpBorderRadius": 0,
 "top": "0%",
 "popUpShadowOpacity": 0,
 "popUpShadowColor": "#000000",
 "selectedPopUpFontColor": "#FFFFFF",
 "backgroundColor": [
  "#666666"
 ],
 "backgroundOpacity": 0.9,
 "paddingRight": 5,
 "height": "8.982%",
 "playList": "this.DropDown_0ACFFFCA_07F2_EDEC_417E_DD436B2640C1_playlist",
 "fontSize": 14,
 "fontColor": "#FFFFFF",
 "borderRadius": 0,
 "popUpShadowSpread": 1,
 "borderSize": 0,
 "arrowBeforeLabel": false,
 "propagateClick": true,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0
 ],
 "rollOverPopUpBackgroundColor": "#FFFFFF",
 "class": "DropDown",
 "selectedPopUpBackgroundColor": "#333333",
 "popUpGap": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 0,
 "textDecoration": "none",
 "data": {
  "name": "DropDown1204"
 },
 "paddingLeft": 5,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7DAC911C_70DB_E99C_41B9_A15142E519A6",
 "minHeight": 1,
 "children": [
  "this.IconButton_7D01D881_70ED_E765_41D9_2D20215E503C",
  "this.IconButton_7E24E1E5_70EF_28AD_41C6_515E62A7C3D9",
  "this.IconButton_7E7FA819_70ED_2764_4185_0B1ABB05F9E1"
 ],
 "width": "33.33%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "horizontal",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "left"
 },
 "paddingBottom": 0,
 "gap": 30,
 "overflow": "scroll",
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7D7CC912_70D4_F967_41BA_7D92CC6CC7F6",
 "minHeight": 1,
 "children": [
  "this.IconButton_7F1DD79E_70EB_689F_41D4_BF3F0B9C74AF"
 ],
 "width": "33.33%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "horizontal",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "middle"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7DA7EAA8_70D5_F8A3_41D4_D374BB9FF13E",
 "minHeight": 1,
 "children": [
  "this.IconButton_7D01D0B8_70F7_68A4_41AA_C8C58B453F68"
 ],
 "width": "33.33%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "horizontal",
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "right"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7E61F6DC_70F5_28E3_41C3_6FFE491F3CF5",
 "minHeight": 1,
 "children": [
  "this.Container_7E6106DC_70F5_28E3_41B4_F42DB41DBBA8",
  "this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920"
 ],
 "shadowColor": "#000000",
 "left": "15%",
 "right": "15%",
 "contentOpaque": false,
 "layout": "vertical",
 "minWidth": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "shadowSpread": 1,
 "top": "7%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7F7E7B33_70D5_59A4_41D8_A52D0089886C",
 "minHeight": 1,
 "children": [
  "this.Container_7F7E6B33_70D5_59A4_4189_3D16ADB08068",
  "this.Container_7F7EAB33_70D5_59A4_41C5_29E0A71BBDC7"
 ],
 "shadowColor": "#000000",
 "left": "15%",
 "right": "15%",
 "contentOpaque": false,
 "layout": "vertical",
 "minWidth": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "shadowSpread": 1,
 "top": "7%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 6,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_13A251E1_05FA_716D_4196_CDAAB1C1FAE5_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65708F8E_69AD_7D07_41C1_57F061BE6B42",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_188AACBC_05BA_37DB_415F_674C6BC93BFE_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654ADF9E_69AD_7D07_41CB_083A3A0382AC",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654DEF8E_69AD_7D07_418B_D14A4AC5CA77",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1DEEFF85_059A_31B5_4187_BED211D5CE9C_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654C3F8E_69AD_7D07_41C4_898983491656",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654BAF9E_69AD_7D07_41D1_6226A0449FF6",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19A9C854_05BE_3F54_4164_F939C1833B65_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654A2F9E_69AD_7D07_41CD_84B5DF044D91",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654C9F9E_69AD_7D07_41D6_063F29A2812F",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654CFF9E_69AD_7D07_41D4_A0F38C305E11",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_148CE8B5_196B_5B4E_41B1_8343DFE78D1E_1_HS_2_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654B5F9E_69AD_7D07_41C8_8708AEB187D1",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_6577CF8E_69AD_7D07_41BD_501B3BAD3D4A",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_117867BC_05BE_71DB_418D_23EE4304808C_1_HS_2_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65761F8E_69AD_7D07_415C_B0F2B3628D99",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7BD8F2AB_69B7_670D_41D9_5EE1BE2A932E_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DC75FEA_69B3_BD0F_419B_A0AD3BCF8C11",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_0_0.png",
   "width": 420,
   "height": 330,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DC9BFE8_69B3_BD0B_41D5_270927787F5A",
 "colCount": 4,
 "frameCount": 21
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DCA2FE8_69B3_BD0B_41BF_9D7BE7A2C9B5",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_2_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DCA6FE8_69B3_BD0B_419C_58BF9EBF622B",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7ACB4B9E_69B4_A507_41C9_C4006E50CF0C_1_HS_3_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DCA8FE8_69B3_BD0B_41C8_20557E264785",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_124DD3B6_05EA_71D4_4194_B9EFC2077C47_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654D1F8E_69AD_7D07_41BE_096089EAA4B0",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_10BA6496_05FE_D7D4_4187_17361FFC0E77_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65702F8E_69AD_7D07_418C_747D76B067BA",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65759F8E_69AD_7D07_41D6_C43224F18DF6",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1120540D_059A_56B5_4175_4B4CCB7A408D_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_6575EF8E_69AD_7D07_4175_CBEAD5C8DAFB",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CC340B8_201A_9CD9_41A3_56DD661EE8CB_1_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65785F7F_69AD_7D05_41D6_2D984AF236E7",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0_HS_2_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7BE0E809_69B7_630D_41B7_D988CD611952",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_08E45B5C_059E_5154_417A_ED172912D8FA_0_HS_3_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7BE1280A_69B7_630F_41CF_D6D44700071D",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE37D75_69B5_FD05_41C9_C10B5AA7D54B_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7DC86FE7_69B3_BD05_41CE_2BF7591932AD",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_103515CB_05AA_71BD_4184_150FCFB3FE01_1_HS_3_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65770F8E_69AD_7D07_41CF_566DCEDAFAC8",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1EFD1E68_05AE_537B_4196_B581C49310D7_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654C3F9E_69AD_7D07_41CD_47EF478D5BE6",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1F875887_05AA_7FB5_4137_DCD0676F69FA_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654B6F8E_69AD_7D07_41CC_78D8BF670ADE",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_188C6A55_05BE_7355_415E_DAAF5BF29F15_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654A9F9E_69AD_7D07_41C6_26B772018450",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_12_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_487B16D6_69F3_6F07_41D9_6F4932C22568",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_13_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_487B66D6_69F3_6F07_41D9_DACF2A0F69BA",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_14_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_4864B6D6_69F3_6F07_41C3_E5F1FCFE4E4D",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_15_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_486406D6_69F3_6F07_41AA_0E9484A8F132",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_16_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_486466D6_69F3_6F07_41CF_4D5755F5F86C",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7AE7E14A_69B5_650E_41CF_4E1E86BBDB8A_0_HS_17_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_4865B6D6_69F3_6F07_41C4_426A77F8622C",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_6_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_705EA2BC_69DF_E70B_41C5_BF9B39AAC720",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_7_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_4879D6D5_69F3_6F05_4195_59B5153E6E0E",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_8_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_487926D5_69F3_6F05_41A8_CD26FE16FF7E",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_9_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_705C72BC_69DF_E70B_41D9_50BC684F06FC",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_10_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_487AF6D5_69F3_6F05_41CC_64D939452872",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7894145C_69BF_A30B_41D7_CF0F58331128_0_HS_11_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_705D52BD_69DF_E705_41BB_061B8914A5F9",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65725F8E_69AD_7D07_41C2_E866BB1DB3E4",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11FD5776_0596_3157_418C_8BCECD289C58_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65733F8E_69AD_7D07_41B9_88ED78AA584E",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_6570CF8E_69AD_7D07_41CA_EB04BE176874",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_13D98F45_05FA_32B5_4194_2BD750AFB3A8_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654F2F8E_69AD_7D07_41CD_85622C0D64FD",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24D9D895_059A_5FD4_4190_CF13B1E879C3_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65498F9E_69AD_7D07_41D5_4A94E5B4E997",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65766F8E_69AD_7D07_419B_8236262E831A",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_6576BF8E_69AD_7D07_41C5_48B46C0C8F38",
 "colCount": 4,
 "frameCount": 21
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_2_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_6576FF8E_69AD_7D07_41A6_075D7B1E958B",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_11E0C688_0596_73BB_415F_C91017C010A0_1_HS_3_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_65754F8E_69AD_7D07_41D1_08BA7EBCF97B",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1C5D08A5_059E_5FF4_4188_589E116A65D4_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654D7F8E_69AD_7D07_41C2_D11E2FA243F7",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_1_HS_0_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654CAF8E_69AD_7D07_41C8_DDC4CB706610",
 "colCount": 4,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1C5E02A8_059A_D3FC_4156_AE12CDAFE288_1_HS_1_0.png",
   "width": 1200,
   "height": 1440,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_654B0F8E_69AD_7D07_41CE_46FD6D930445",
 "colCount": 4,
 "frameCount": 24
},
{
 "paddingLeft": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "id": "IconButton_7E24E1E5_70EF_28AD_41C6_515E62A7C3D9",
 "minHeight": 1,
 "width": 60,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "horizontalAlign": "center",
 "toolTipFontColor": "#606060",
 "minWidth": 1,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "toolTipPaddingLeft": 6,
 "height": 60,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7E24E1E5_70EF_28AD_41C6_515E62A7C3D9.png",
 "backgroundOpacity": 0,
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "click": "if(!this.Container_0B074894_07F5_1264_4191_8C3F0D97D974.get('visible')){ this.setComponentVisibility(this.Container_0B074894_07F5_1264_4191_8C3F0D97D974, true, 0, this.effect_7FE5E962_70FD_79A7_41D6_E37F95A170DA, 'showEffect', false) } else { this.setComponentVisibility(this.Container_0B074894_07F5_1264_4191_8C3F0D97D974, false, 0, this.effect_7FE5F962_70FD_79A7_41D9_BD832243F241, 'hideEffect', false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "paddingTop": 0,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "propagateClick": false,
 "toolTipShadowHorizontalLength": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "maxHeight": 60,
 "data": {
  "name": "IconButton3629"
 },
 "paddingBottom": 0,
 "toolTip": "Click to Show Floor Plan",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipShadowVerticalLength": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "paddingLeft": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "id": "IconButton_7E7FA819_70ED_2764_4185_0B1ABB05F9E1",
 "minHeight": 1,
 "width": 60,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "horizontalAlign": "center",
 "toolTipFontColor": "#606060",
 "minWidth": 1,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "toolTipPaddingLeft": 6,
 "height": 60,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7E7FA819_70ED_2764_4185_0B1ABB05F9E1.png",
 "backgroundOpacity": 0,
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "click": "if(!this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77.get('visible')){ this.setComponentVisibility(this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77, true, 0, this.effect_7F4D95B0_70F7_28A4_41D4_D814280056AC, 'showEffect', false) } else { this.setComponentVisibility(this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77, false, 0, this.effect_7F4D85B0_70F7_28A4_41DA_235A5B52CEB1, 'hideEffect', false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "paddingTop": 0,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "propagateClick": false,
 "toolTipShadowHorizontalLength": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "maxHeight": 60,
 "data": {
  "name": "IconButton4193"
 },
 "paddingBottom": 0,
 "toolTip": "Panorama List",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipShadowVerticalLength": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "paddingLeft": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "id": "IconButton_7F1DD79E_70EB_689F_41D4_BF3F0B9C74AF",
 "minHeight": 1,
 "width": 60,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "horizontalAlign": "center",
 "toolTipFontColor": "#606060",
 "minWidth": 1,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "toolTipPaddingLeft": 6,
 "height": 60,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7F1DD79E_70EB_689F_41D4_BF3F0B9C74AF.png",
 "backgroundOpacity": 0,
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "click": "if(!this.Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA.get('visible')){ this.setComponentVisibility(this.Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA, true, 0, this.effect_61C6C587_70D5_696D_4147_2B45033C6F2A, 'showEffect', false) } else { this.setComponentVisibility(this.Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA, false, 0, this.effect_61C6D587_70D5_696D_41D5_7C21DE33D250, 'hideEffect', false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "paddingTop": 0,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "propagateClick": false,
 "toolTipShadowHorizontalLength": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "maxHeight": 60,
 "data": {
  "name": "IconButton10804"
 },
 "paddingBottom": 0,
 "toolTip": "Photo Album",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipShadowVerticalLength": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_7E6106DC_70F5_28E3_41B4_F42DB41DBBA8",
 "minHeight": 1,
 "children": [
  "this.HTMLText_7E6116DC_70F5_28E3_41D3_A4F0D42AC081",
  "this.IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "height": 80,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#FF361B"
 ],
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "id": "ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920",
 "minHeight": 1,
 "rollOverItemThumbnailShadowColor": "#FF361B",
 "itemLabelFontFamily": "Oswald Regular",
 "width": "100%",
 "itemMaxHeight": 1000,
 "horizontalAlign": "center",
 "itemBorderRadius": 0,
 "minWidth": 1,
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "selectedItemLabelFontColor": "#C1280E",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "height": "100%",
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 70,
 "playList": "this.ThumbnailGrid_7E6136DC_70F5_28E3_41CE_745B5FE1D920_playlist",
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemWidth": 220,
 "propagateClick": false,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemBackgroundColor": [],
 "itemPaddingTop": 3,
 "class": "ThumbnailGrid",
 "itemBackgroundColorRatios": [],
 "itemMinHeight": 50,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "paddingLeft": 70,
 "scrollBarMargin": 2,
 "selectedItemLabelFontSize": 16,
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontSize": 16,
 "itemLabelFontWeight": "normal",
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 160,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 16,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemThumbnailWidth": 220,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "itemLabelGap": 7,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarColor": "#FF361B",
 "paddingTop": 30,
 "shadow": false,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList5161"
 },
 "paddingBottom": 70,
 "gap": 26,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "itemPaddingRight": 3,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "rollOverItemLabelFontColor": "#C1280E",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7F7E6B33_70D5_59A4_4189_3D16ADB08068",
 "minHeight": 1,
 "children": [
  "this.HTMLText_7F7E5B33_70D5_59A4_41B9_FB896E11DD16",
  "this.IconButton_7F7E4B33_70D5_59A4_41C0_AA27B64BBE57"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "height": 80,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#FF361B"
 ],
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7F7EAB33_70D5_59A4_41C5_29E0A71BBDC7",
 "minHeight": 1,
 "children": [
  "this.ViewerAreaLabeled_7F7E9B33_70D5_59A4_41D0_C6B873DA4615",
  "this.Container_7F7E8B33_70D5_59A4_41B8_472D10A23592"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "height": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-photoalbum"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_7E6116DC_70F5_28E3_41D3_A4F0D42AC081",
 "minHeight": 0,
 "width": "77.115%",
 "left": "0%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "top": "0%",
 "height": 80,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 17,
 "shadow": false,
 "class": "HTMLText",
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.7vh;font-family:'Oswald';\"><B>PANORAMA LIST/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "paddingBottom": 0,
 "paddingLeft": 80,
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87",
 "minHeight": 40,
 "width": 50,
 "right": 15,
 "horizontalAlign": "right",
 "minWidth": 40,
 "pressedRollOverIconURL": "skin/IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87_pressed_rollover.jpg",
 "pressedIconURL": "skin/IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87_pressed.jpg",
 "top": 15,
 "verticalAlign": "top",
 "height": 50,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87.jpg",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_7E6126DC_70F5_28E3_41D5_5CCCEF294B87_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_7E6166DC_70F5_28E3_41D5_DB41C69DAC77, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "IconButton",
 "maxWidth": 50,
 "maxHeight": 50,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_7F7E5B33_70D5_59A4_41B9_FB896E11DD16",
 "minHeight": 0,
 "width": "77.115%",
 "left": "0%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "top": "0%",
 "height": 80,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 17,
 "shadow": false,
 "class": "HTMLText",
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.7vh;font-family:'Oswald';\"><B>PHOTOALBUM/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "paddingBottom": 0,
 "paddingLeft": 80,
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "IconButton_7F7E4B33_70D5_59A4_41C0_AA27B64BBE57",
 "minHeight": 40,
 "width": 50,
 "right": 15,
 "horizontalAlign": "right",
 "minWidth": 40,
 "pressedIconURL": "skin/IconButton_7F7E4B33_70D5_59A4_41C0_AA27B64BBE57_pressed.jpg",
 "top": 15,
 "verticalAlign": "top",
 "height": 50,
 "paddingRight": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_7F7E4B33_70D5_59A4_41C0_AA27B64BBE57.jpg",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_7F7E4B33_70D5_59A4_41C0_AA27B64BBE57_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_7F7ECB33_70D5_59A4_41BB_66C0E5B2FCEA, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "IconButton",
 "maxWidth": 50,
 "maxHeight": 50,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand",
 "transparencyActive": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_7F7E8B33_70D5_59A4_41B8_472D10A23592",
 "minHeight": 1,
 "children": [
  "this.IconButton_7F7EFB33_70D5_59A4_41B1_3ADC418C3028",
  "this.Container_7F7EEB33_70D5_59A4_41D7_C7F489E4951C",
  "this.IconButton_7F7EDB33_70D5_59A4_41C5_616F6612C554"
 ],
 "left": "0%",
 "width": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "layout": "horizontal",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container arrows"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7F7EEB33_70D5_59A4_41D7_C7F489E4951C",
 "minHeight": 1,
 "width": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "layout": "absolute",
 "height": "30%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container separator"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "propagateClick": false,
 "paddingTop": 0,
 "shadow": false,
 "mouseWheelEnabled": true,
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player1279"
 },
 "paddingBottom": 0,
 "gap": 10,
 "mobileMipmappingEnabled": false,
 "overflow": "visible",
 "paddingLeft": 0,
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
