Imports System
Imports System.Collections
Imports System.Collections.Generic

Public Enum DataByteOrder
    LoFirst
    HiFirst
End Enum


Public Class RequestBuilder
    Implements IEnumerable(Of Byte), IEnumerable

    Private requestData As List(Of Byte) = New List(Of Byte)()

    Public Sub New()
    End Sub

    Public Sub New(ByVal bytes As IEnumerable(Of Byte))
        Me.AddBytes(bytes)
    End Sub

    Public ReadOnly Property Length As Integer
        Get
            Return Me.requestData.Count
        End Get
    End Property

    Public Sub AddByte(ByVal b As Byte)
        Me.requestData.Add(b)
    End Sub

    Public Sub InsertByte(ByVal pos As Integer, ByVal b As Byte)
        Me.requestData.Insert(pos, b)
    End Sub

    Public Sub InsertBytes(ByVal pos As Integer, ByVal bytes As Byte())
        Me.requestData.InsertRange(pos, CType(bytes, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddBytes(ByVal l As IEnumerable(Of Byte))
        Me.requestData.AddRange(l)
    End Sub

    Public Sub AddInt16(ByVal s As Short, ByVal byteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(s)
        If byteOrder = DataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddInt16(ByVal s As Short)
        Me.AddInt16(s, DataByteOrder.LoFirst)
    End Sub

    Public Sub AddUInt16(ByVal s As UShort, ByVal byteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(s)
        If byteOrder = DataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddUInt16(ByVal s As UShort)
        Me.AddUInt16(s, DataByteOrder.LoFirst)
    End Sub

    Public Sub AddInt32(ByVal i As Integer, ByVal byteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(i)
        If byteOrder = DataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddInt32(ByVal i As Integer)
        Me.AddInt32(i, DataByteOrder.LoFirst)
    End Sub

    Public Sub AddUInt32(ByVal ui As UInteger, ByVal byteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(ui)
        If byteOrder = DataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Private Sub AddInt64(ByVal i As Long, ByVal dataByteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(i)
        If dataByteOrder = dataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddInt64(ByVal i As Long)
        Me.AddInt64(i, DataByteOrder.LoFirst)
    End Sub

    Private Sub AddUInt64(ByVal ui As ULong, ByVal dataByteOrder As DataByteOrder)
        Dim input As Byte() = BitConverter.GetBytes(ui)
        If dataByteOrder = dataByteOrder.HiFirst Then input = BitwiseUtils.Reverse(input)
        Me.AddBytes(CType(input, IEnumerable(Of Byte)))
    End Sub

    Public Sub AddUInt32(ByVal ui As UInteger)
        Me.AddUInt32(ui, DataByteOrder.LoFirst)
    End Sub

    Public Sub AddUInt64(ByVal ui As ULong)
        Me.AddUInt64(ui, DataByteOrder.LoFirst)
    End Sub

    Public Sub Clear()
        Me.requestData.Clear()
    End Sub

    Public Function GetBytes() As Byte()
        Return Me.requestData.ToArray()
    End Function

    Default Public Property Item(ByVal index As Integer) As Byte
        Get
            Return Me.requestData(index)
        End Get
        Set(ByVal value As Byte)
            Me.requestData(index) = value
        End Set
    End Property



    Public Function GetListInterface() As IList(Of Byte)
        Return CType(Me.requestData, IList(Of Byte))
    End Function

    Public Function IEnumerable_GetEnumerator() As IEnumerator Implements IEnumerable.GetEnumerator
        Return CType(Me.requestData.GetEnumerator(), IEnumerator)
    End Function

    Public Function IEnumerable_GetEnumerator1() As IEnumerator(Of Byte) Implements IEnumerable(Of Byte).GetEnumerator
        Return CType(Me.requestData.GetEnumerator(), IEnumerator(Of Byte))
    End Function
End Class

