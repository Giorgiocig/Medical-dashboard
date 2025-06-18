import { Box } from '@mui/material'
import DoctorFilterPopover from './DoctorFilterPopover'
import DoctorFilter from './DoctorFilter'
import TooltipIconBtn from '../TooltipIconBtn'
import DoctorSorting from './DoctorSorting'
import SpecialityFilter from './SpecialityFilter'

export default function DoctorFiltersSection({ options }: any) {
    console.log(options.value)
    return (
        <>
            {options.map((option: any, index: number) => (
                <Box key={index} sx={{ display: 'flex', width: '80%' }}>
                    <DoctorFilterPopover title={option.title}>
                        {option.type === 'text' && (
                            <DoctorFilter
                                field={option.field}
                                value={option.value}
                                onChange={option.onChange}
                            />
                        )}
                        {option.type === 'sorting' && (
                            <DoctorSorting
                                fields={option.fields}
                                value={option.value}
                                onChange={option.onChange}
                                orderValue={option.orderValue}
                                onOrderChange={option.onOrderChange}
                            />
                        )}
                        {option.type === 'speciality' && (
                            <SpecialityFilter
                                value={option.value}
                                onChange={option.onChange}
                                doctors={option.doctors}
                            />
                        )}
                    </DoctorFilterPopover>
                    {option.showClearButton && (
                        <TooltipIconBtn title='cancel filter' action={option.action} />
                    )}
                </Box>
            ))}
        </>
    )
}
