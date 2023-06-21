import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ChatHeader() {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  const channelMessages = useSelector(({ messages }) => Object.entries(messages)
    .filter(([, value]) => value.channelId === channels.activeId));
  const activeChannelName = Object.keys(channels.value).length > 0 ? channels.value[channels.activeId].name : '';
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {activeChannelName}
        </b>
      </p>
      <span className="text-muted">
        {channelMessages.length}
        {' '}
        {t('messages')}
      </span>
    </div>
  );
}

export default ChatHeader;
