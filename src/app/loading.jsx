import { Spinner } from '@heroui/react';
import React from 'react';

const loading = () => {
    return (
        <div>
           <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" size='xl' />
        <span className="text-xs text-muted">Warning</span>
      </div>
            
        </div>
    );
};

export default loading;