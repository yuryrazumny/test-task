import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    color: ({ color }) => color,
  },
}))

export default function Page({ id, options, count, color, data }) {
  console.log(id, options)
  return (
    <MyWonderfulComponent
      id={id}
      options={options}
      count={count}
      color={color}
      data={data}
    >
      I&apos;m text from a component
    </MyWonderfulComponent>
  )
}

function MyWonderfulComponent({ id, options, color, children, ...props }) {
  const { count } = props
  const [summ, setSumm] = useState(count)
  const [myClasses, setClasses] = useState({})

  const classes = useStyles({ color: color.toLowerCase() })

  useEffect(() => {
    setClasses(classes)
    console.log('123')
  }, [classes])

  useEffect(() => {
    if (id && options?.params?.fields?.isDynamic) {
      setSumm((s) => s + 1)
    }
  }, [id, options])

  return (
    <>
      <h1 className={myClasses.title}>Hello World!</h1>
      <Grid container>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item>{summ}</Grid>
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  const data = 'Hello from SSR'

  console.log(data)

  return {
    props: {
      options: {
        params: { fields: { isDynamic: context.query.isDynamic || null } },
      },
      id: context.query.id || null,
      count: +context.query.count || 0,
      color: context.query.color || 'red',
      data,
    },
  }
}
