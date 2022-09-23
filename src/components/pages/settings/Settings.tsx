import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../../hoc/RequireAuth'
import ContentBlock from '../../ui/ContentBlock'
import { settingsList, settingsRoutes } from './SettingsData'
import SettingsItem from './SettingsItem'
import './Settings.scss'
import { useAppDispatch } from '../../hooks/appRedux'

const Settings:FC = () => {


  return (
      <ContentBlock className='w-full h-full flex'>
        <>
          <div className='flex flex-col gap-2 w-64 h-full border-r border-r-superLightGray pr-3 overflow-y-auto'>
            {settingsList.map(item=>
              <SettingsItem key={item.title} title={item.title} Icon={item.Icon} to={item.to}/>
            )}
          </div>
          <div className="px-3 w-full overflow-y-auto">
            <Routes>
              {settingsRoutes.map(route => 
                <Route
                 path={route.path}
                 key={route.path}
                 element={route.auth
                  ? <RequireAuth><route.component/></RequireAuth> 
                  : <route.component/>
                }
                />
              )}
            </Routes>
          </div>
        </>
      </ContentBlock>
  )
}

export default Settings