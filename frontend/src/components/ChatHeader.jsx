import React from 'react';
import { useSelector } from 'react-redux';

function ChatHeader() {
  const channels = useSelector((state) => state.channels);
  const channelMessages = useSelector(({ messages }) => Object.entries(messages)
    .filter(([, value]) => value.channelId === channels.activeId));
  const activeChannelName = channels.value.length > 0 ? channels.value[channels.activeId - 1].name : '';
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
        сообщений
      </span>
    </div>
  );
}

export default ChatHeader;